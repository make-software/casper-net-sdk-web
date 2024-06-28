namespace NCTLWebExplorer.Models;

public enum TransactionCategory
{
    Mint = 0,
    Auction = 1,
    InstallUpgrade = 2,
    Large = 3,
    Medium = 4,
    Small = 5,
}

public class TransactionSummary
{
    public string Category { get; set; }
    public string Version { get; set; }
    public string Hash { get; set; }
    public string BlockHash { get; set; }
    public string Result { get; set; }
    public string Initiator { get; set; }
    public string Timestamp { get; set; }
}