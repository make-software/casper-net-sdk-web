using System.Text.Json;
using Casper.Network.SDK.SSE;
using Casper.Network.SDK.Types;
using NCTLWebExplorer.Models;

namespace NCTLWebExplorer.Services;

public class EventListener
{
    private readonly ISSEClient _sseService;
    private readonly ILogger<EventListener> _logger;
    
    private readonly IEventStore _store;
    public IEventStore Store => _store;
    
    private readonly string _cbStepsName = Guid.NewGuid().ToString();
    private readonly string _cbBlocksName = Guid.NewGuid().ToString();
    private readonly string _cbDeploysName = Guid.NewGuid().ToString();
    private readonly string _cbTransactionsName = Guid.NewGuid().ToString();
    
    public delegate void NewStepHandler(Step newStep);
    public event NewStepHandler StepAdded;
    
    public delegate void NewBlockHandler(Block newBlock);
    public event NewBlockHandler BlockAdded;

    public delegate void NewDeployHandler(DeployProcessed newDeploy);
    
    public event NewDeployHandler DeployAdded;

    public delegate void NewTransactionHandler(TransactionProcessed newTransaction);
    
    public event NewTransactionHandler TransactionAdded;

    public async Task<PaginatedSummary<StepSummary>> GetSteps(int skip, int pageSize)
    {
        return await _store.GetSteps(skip, pageSize);
    }

    public async Task<PaginatedSummary<BlockSummary>> GetBlocks(int skip, int pageSize)
    {
        return await _store.GetBlocks(skip, pageSize);
    }

    public async Task<PaginatedSummary<TransactionSummary>> GetTransactions(int skip, int pageSize)
    {
        return await _store.GetTransactions(skip, pageSize);
    }

    public async Task<TransactionSummary> GetTransactionByHash(string hash)
    {
        return await _store.GetTransactionByHash(hash);
    }

    public async Task<StepSummary> GetStepByEraId(ulong eraId)
    {
        return await _store.GetStepByEraId(eraId);
    }
    
    public EventListener(ISSEClient sseService, ILogger<EventListener> logger, IConfiguration config)
    {
        _sseService = sseService;
        _logger = logger;

        var connectionString = config["MySqlConnection"];
        ulong startFrom = 0;
        if (!string.IsNullOrWhiteSpace(connectionString))
        {
            var mysqlStore = new MysqlEventStore(connectionString, _logger);
            startFrom = mysqlStore.GetHighestEventId();
            startFrom = startFrom == 0 ? 0 : startFrom + 1;
            _store = mysqlStore;
            
            _logger.LogInformation("Using MysqlEventStore");
        }
        else
        {
            startFrom = 0;
            _store = new MemoryEventStore(_logger);
            _logger.LogInformation("Using MemoryEventStore");
        }
        
        try
        {
            _sseService.AddEventCallback(EventType.Step, _cbStepsName,  NewEventCallback, (int)startFrom);
            _sseService.AddEventCallback(EventType.BlockAdded, _cbBlocksName,  NewEventCallback, (int)startFrom);
            _sseService.AddEventCallback(EventType.DeployProcessed, _cbDeploysName,  NewEventCallback, (int)startFrom);
            _sseService.AddEventCallback(EventType.TransactionProcessed, _cbTransactionsName,  NewEventCallback, (int)startFrom);
            Console.WriteLine($"StartListening");

            _sseService.StartListening();
        }
        catch
        {
            // ignored
        }
    }
    
    private void NewEventCallback(SSEvent evt)
    {
        _logger.LogTrace($"New event {evt.Id} - {evt.EventType}");

        if (evt.EventType == EventType.Step)
        {
            var step = evt.Parse<Step>();
            _store.AddStep(new StepSummary()
            {
                EventId = (ulong)evt.Id,
                EraId = step.EraId,
                Json = evt.Result.GetRawText(),
            });
            OnStepAdded(step);
        }
        else if (evt.EventType == EventType.BlockAdded)
        {
            var blockAdded = evt.Parse<BlockAdded>();
            _store.AddBlock(new BlockSummary()
            {
                EventId = (ulong)evt.Id,
                Hash = blockAdded.BlockHash,
                EraId = blockAdded.Block.EraId,
                Height = blockAdded.Block.Height,
                ProtocolVersion = blockAdded.Block.ProtocolVersion,
                Timestamp = blockAdded.Block.Timestamp,
                IsEraEnd = blockAdded.Block.EraEnd != null,
                Proposer = blockAdded.Block.Proposer.PublicKey.ToString(),
                TransactionCount = (uint)blockAdded.Block.Transactions.Count,
            });
            OnBlockAdded(blockAdded.Block);
        }
        else if (evt.EventType == EventType.DeployProcessed)
        {
            var deployProcessed = evt.Parse<DeployProcessed>();
            _store.AddTransaction(new TransactionSummary()
            {
                EventId = (ulong)evt.Id,
                Hash = deployProcessed.DeployHash,
                BlockHash = deployProcessed.BlockHash,
                Initiator = deployProcessed.Account.ToAccountHex(),
                Timestamp = deployProcessed.Timestamp,
                Category = "Deploy",
                Version = "Deploy",
                Result = deployProcessed.ExecutionResult.IsSuccess ? "Success" : "Failure",
                MessageCount = 0,
                Messages = "[]",
            });
            OnDeployAdded(deployProcessed);
        }
        else if (evt.EventType == EventType.TransactionProcessed)
        {
            var transactionProcessed = evt.Parse<TransactionProcessed>();
            var messages = "[]";
            var txProcessed = evt.Result.GetProperty("TransactionProcessed");
            if (txProcessed.ValueKind == JsonValueKind.Object)
            {
                var msgProperty = txProcessed.GetProperty("messages");
                if (msgProperty.ValueKind == JsonValueKind.Array)
                    messages = msgProperty.GetRawText();
            }
            _store.AddTransaction(new TransactionSummary()
            {
                EventId = (ulong)evt.Id,
                Hash = transactionProcessed.TransactionHash.Deploy != null ? 
                    transactionProcessed.TransactionHash.Deploy : transactionProcessed.TransactionHash.Version1,
                BlockHash = transactionProcessed.BlockHash,
                Initiator = transactionProcessed.InitiatorAddr.PublicKey != null 
                    ? transactionProcessed.InitiatorAddr.PublicKey.ToAccountHex()
                    : transactionProcessed.InitiatorAddr.AccountHash.ToString(),
                Timestamp = transactionProcessed.Timestamp,
                Category = "n/a",
                Version = transactionProcessed.TransactionHash.Deploy != null ? "Deploy" : "Version1",
                Result = transactionProcessed.ExecutionResult.ErrorMessage == null ? "Success" : "Failure",
                MessageCount = transactionProcessed.Messages.Count,
                Messages = messages,
            });
            _logger.LogDebug("Transaction added to event store.");
            OnTransactionAdded(transactionProcessed);
        }
    }
    
    protected virtual void OnStepAdded(Step step)
    {
        // make a copy to be more thread-safe
        var handler = StepAdded;

        // invoke the subscribed event-handler(s)
        handler?.Invoke(step);
    }
    
    protected virtual void OnBlockAdded(Block block)
    {
        // make a copy to be more thread-safe
        var handler = BlockAdded;

        // invoke the subscribed event-handler(s)
        handler?.Invoke(block);
    }
    
    protected virtual void OnDeployAdded(DeployProcessed deploy)
    {
        // make a copy to be more thread-safe
        var handler = DeployAdded;

        // invoke the subscribed event-handler(s)
        handler?.Invoke(deploy);
    }
    
    protected virtual void OnTransactionAdded(TransactionProcessed transaction)
    {
        // make a copy to be more thread-safe
        var handler = TransactionAdded;

        // invoke the subscribed event-handler(s)
        handler?.Invoke(transaction);
    }

    public async Task StopListenning()
    {
        await _sseService.StopListening();
    }

    public void StartListening()
    {
        _sseService.NodeVersion = 2;
        _sseService.StartListening();
    }

    public bool IsRunning()
    {
        return _sseService.IsRunning();
    }

    public void SwitchToNodeVersion2()
    {
        _sseService.NodeVersion = 2;
    }
}
