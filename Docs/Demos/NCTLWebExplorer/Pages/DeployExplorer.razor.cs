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
    
    [Inject] protected EventStore EventStore { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            _data = EventStore.Transactions.TakeLast(_deployGrid.PageSize).Reverse().ToArray();
            await _deployGrid.Reload();
            await InvokeAsync(StateHasChanged);
            EventStore.BlockAdded += async (_) => await InvokeAsync(_deployGrid.Reload);
        }
    }
    private void LoadData(LoadDataArgs args)
    {
        _isLoading = true;
        
        _count = EventStore.Transactions.Count();
        _data = EventStore.Transactions.Reverse().Skip(args.Skip?? 0).Take(_deployGrid.PageSize);
        _isLoading = false;
    }
}
