namespace NCTLWebExplorer.Models;

public class PaginatedSummary<T>
{
    public List<T> Data;
    public int ItemCount;
    public int PageCount;
}