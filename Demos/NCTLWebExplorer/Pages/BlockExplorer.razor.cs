using NCTLWebExplorer.Services;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using Radzen;
using Radzen.Blazor;

namespace NCTLWebExplorer.Pages;

public partial class BlockExplorer
{
    private RadzenDataGrid<Block> _blockGrid;
    private IEnumerable<Block> _data = new List<Block>();

    private int _count;
    private bool _isLoading;
    
    [Inject] protected EventStore EventStore { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            _data = EventStore.Blocks.TakeLast(_blockGrid.PageSize).Reverse().ToArray();
            await _blockGrid.Reload();
            await InvokeAsync(StateHasChanged);
            EventStore.BlockAdded += async (_) => await InvokeAsync(_blockGrid.Reload);
        }
    }

    private void LoadData(LoadDataArgs args)
    {
        _isLoading = true;
        _count = EventStore.Blocks.Count();
        _data = EventStore.Blocks.Reverse().Skip(args.Skip ?? 0).Take(_blockGrid.PageSize);
        _isLoading = false;
    }
}
