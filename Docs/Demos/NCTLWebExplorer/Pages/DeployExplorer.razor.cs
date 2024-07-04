using System.Globalization;
using NCTLWebExplorer.Services;
using Casper.Network.SDK.SSE;
using Microsoft.AspNetCore.Components;
using NCTLWebExplorer.Models;
using Radzen;
using Radzen.Blazor;

namespace NCTLWebExplorer.Pages;

public partial class DeployExplorer
{
    private RadzenDataGrid<TransactionSummary> _deployGrid;
    private IEnumerable<TransactionSummary> _data = new List<TransactionSummary>();

    private int _count;
    private bool _isLoading;
    
    [Inject] protected EventListener EventListener { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            var paginatedData = await EventListener.GetTransactions(0, _deployGrid.PageSize);
            _count = paginatedData.ItemCount;
            _data = paginatedData.Data;
            await _deployGrid.Reload();
            await InvokeAsync(StateHasChanged);
            EventListener.BlockAdded += async (_) => await InvokeAsync(_deployGrid.Reload);
        }
    }
    private async Task LoadData(LoadDataArgs args)
    {
        _isLoading = true;
        
        var paginatedData = await EventListener.GetTransactions(args.Skip ?? 0, _deployGrid.PageSize);
        _count = paginatedData.ItemCount;
        _data = paginatedData.Data;
        _isLoading = false;
    }
    
    private string TimestampToLocalTime(string timestamp)
    {
        if(DateTime.TryParse(timestamp, out var t))
            return t.ToLocalTime().ToString("", CultureInfo.CurrentCulture);
        return timestamp;
    }
}
