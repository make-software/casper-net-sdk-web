namespace NCTLWebExplorer.Models;

public class BlockSummary
{
    public ulong EventId { get; init; }
    public string Hash { get; init; }
    public ulong EraId { get; init; }
    public ulong Height { get; init; }
    public string ProtocolVersion { get; init; }
    public string Timestamp { get; init; }
    public bool IsEraEnd { get; init; }
    public string Proposer { get; init; }
    public uint TransactionCount { get; init; }
}