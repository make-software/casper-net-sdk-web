using NCTLWebExplorer.Models;

namespace NCTLWebExplorer.Services;

public interface IEventStore
{
    public void AddStep(StepSummary step);
    public void AddBlock(BlockSummary block);
    public void AddTransaction(TransactionSummary transaction);
    
    public Task<PaginatedSummary<StepSummary>> GetSteps(int skip, int pageSize);
    
    public Task<PaginatedSummary<BlockSummary>> GetBlocks(int skip, int pageSize);
    
    public Task<PaginatedSummary<TransactionSummary>> GetTransactions(int skip, int pageSize);
    
    public Task<TransactionSummary> GetTransactionByHash(string hash);
    
    public Task<StepSummary> GetStepByEraId(ulong eraId);

}