using Casper.Network.SDK.Types;
using NCTLWebExplorer.Models;

namespace NCTLWebExplorer.Services;

public class MemoryEventStore : IEventStore
{
    private readonly List<StepSummary> _steps = new();

    private readonly List<BlockSummary> _blocks = new();

    private readonly List<TransactionSummary> _transactions = new();

    private readonly ILogger<EventListener> _logger;

    public MemoryEventStore(ILogger<EventListener> logger)
    {
        _logger = logger;
    }
    public void AddStep(StepSummary step)
    {
        _steps.Add(step);
    }

    public void AddBlock(BlockSummary block)
    {
        _blocks.Add(block);
    }

    public void AddTransaction(TransactionSummary transaction)
    {
        _transactions.Add(transaction);
    }

    public Task<PaginatedSummary<StepSummary>> GetSteps(int skip, int pageSize)
    {
        var data = (_steps as IEnumerable<StepSummary>)
            .Reverse().Skip((int)skip).Take((int)pageSize).ToList();

        var result = new PaginatedSummary<StepSummary>()
        {
            Data = data,
            ItemCount = _steps.Count,
            PageCount = (int)Math.Ceiling((decimal)_steps.Count / (decimal)pageSize),
        };

        return Task.FromResult(result);
    }

    public Task<PaginatedSummary<BlockSummary>> GetBlocks(int skip, int pageSize)
    {
        try
        {
            var data = (_blocks as IEnumerable<BlockSummary>)
                .Reverse().Skip((int)skip).Take((int)pageSize).ToList();
            var result = new PaginatedSummary<BlockSummary>()
            {
                Data = data,
                ItemCount = _blocks.Count,
                PageCount = (int)Math.Ceiling((decimal)_blocks.Count / (decimal)pageSize),
            };

            return Task.FromResult(result);
        }
        catch (Exception e)
        {
            _logger.LogError("Cannot get blocks. Error: " + e.Message);
            var result = new PaginatedSummary<BlockSummary>()
            {
                Data = new List<BlockSummary>(),
                ItemCount = 0,
                PageCount = 0,
            };
            return Task.FromResult(result);
        }
        
    }

    public Task<PaginatedSummary<TransactionSummary>> GetTransactions(int skip, int pageSize)
    {
        var data = (_transactions as IEnumerable<TransactionSummary>)
            .Reverse().Skip((int)skip).Take((int)pageSize).ToList();
        var result = new PaginatedSummary<TransactionSummary>()
        {
            Data = data,
            ItemCount = _transactions.Count,
            PageCount = (int)Math.Ceiling((decimal)_transactions.Count / (decimal)pageSize),
        };

        return Task.FromResult(result);
    }
    
    public Task<StepSummary> GetStepByEraId(ulong eraId)
    {
        return Task.FromResult(_steps.FirstOrDefault(step => step.EraId == eraId));
    }
}