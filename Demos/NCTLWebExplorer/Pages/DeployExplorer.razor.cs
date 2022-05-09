using NCTLWebExplorer.Services;
using Casper.Network.SDK.SSE;
using Microsoft.AspNetCore.Components;
using Radzen;
using Radzen.Blazor;

namespace NCTLWebExplorer.Pages;

public partial class DeployExplorer
{
    private RadzenDataGrid<DeployProcessed> _deployGrid;
    private IEnumerable<DeployProcessed> _data = new List<DeployProcessed>();

    private int _count;
    private bool _isLoading;
    
    [Inject] protected EventStore EventStore { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            _data = EventStore.Deploys.TakeLast(_deployGrid.PageSize).Reverse().ToArray();
            await _deployGrid.Reload();
            await InvokeAsync(StateHasChanged);
            EventStore.BlockAdded += async (_) => await InvokeAsync(_deployGrid.Reload);
        }
    }
    private void LoadData(LoadDataArgs args)
    {
        _isLoading = true;
        
        _count = EventStore.Deploys.Count();
        _data = EventStore.Deploys.Reverse().Skip(args.Skip?? 0).Take(_deployGrid.PageSize);
        _isLoading = false;
    }
}
