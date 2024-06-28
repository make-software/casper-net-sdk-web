using Casper.Network.SDK.SSE;
using Casper.Network.SDK.Types;
using NCTLWebExplorer.Models;

namespace NCTLWebExplorer.Services;

public class EventStore
{
    private readonly ISSEClient _sseService;
    private readonly ILogger<EventStore> _logger;
    
    private readonly List<StepSummary> _steps = new();
    private readonly List<Block> _blocks = new();
    private readonly List<TransactionSummary> _transactions = new();
    
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
    
    public IEnumerable<StepSummary> Steps => _steps;
    
    public IEnumerable<Block> Blocks => _blocks;

    public IEnumerable<TransactionSummary> Transactions => _transactions;
    
    public EventStore(ISSEClient sseService, ILogger<EventStore> logger)
    {
        _sseService = sseService;
        _logger = logger;
        
        try
        {
            _sseService.AddEventCallback(EventType.Step, _cbStepsName,  NewEventCallback);
            _sseService.AddEventCallback(EventType.BlockAdded, _cbBlocksName,  NewEventCallback);
            _sseService.AddEventCallback(EventType.DeployProcessed, _cbDeploysName,  NewEventCallback);
            _sseService.AddEventCallback(EventType.TransactionProcessed, _cbTransactionsName,  NewEventCallback);
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
            _steps.Add(new StepSummary()
            {
                EraId = step.EraId,
                Json = evt.Result.GetRawText(),
            });
            OnStepAdded(step);
        }
        else if (evt.EventType == EventType.BlockAdded)
        {
            var blockAdded = evt.Parse<BlockAdded>();
            _blocks.Add(blockAdded.Block);
            OnBlockAdded(blockAdded.Block);
        }
        else if (evt.EventType == EventType.DeployProcessed)
        {
            var deployProcessed = evt.Parse<DeployProcessed>();
            _transactions.Add(new TransactionSummary()
            {
                Hash = deployProcessed.DeployHash,
                BlockHash = deployProcessed.BlockHash,
                Initiator = deployProcessed.Account.ToAccountHex(),
                Timestamp = deployProcessed.Timestamp,
                Category = "Deploy",
                Version = "Deploy",
                Result = deployProcessed.ExecutionResult.IsSuccess ? "Success" : "Failure",
            });
            OnDeployAdded(deployProcessed);
        }
        else if (evt.EventType == EventType.TransactionProcessed)
        {
            var transactionProcessed = evt.Parse<TransactionProcessed>();
            _transactions.Add(new TransactionSummary()
            {
                
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
