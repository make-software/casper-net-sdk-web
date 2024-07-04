using System.Globalization;
using NCTLWebExplorer.Services;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using NCTLWebExplorer.Models;
using Radzen;
using Radzen.Blazor;

namespace NCTLWebExplorer.Pages;

public partial class BlockExplorer
{
    private RadzenDataGrid<BlockSummary> _blockGrid;
    private IEnumerable<BlockSummary> _data = new List<BlockSummary>();

    private int _count;
    private bool _isLoading;
    
    [Inject] protected EventListener EventListener { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            var paginatedData = await EventListener.GetBlocks(0, _blockGrid.PageSize);
            _count = paginatedData.ItemCount;
            _data = paginatedData.Data;
            await _blockGrid.Reload();
            await InvokeAsync(StateHasChanged);
            EventListener.BlockAdded += async (_) => await InvokeAsync(_blockGrid.Reload);
        }
    }

    private async Task LoadData(LoadDataArgs args)
    {
        _isLoading = true;
        var paginatedData = await EventListener.GetBlocks(args.Skip ?? 0, _blockGrid.PageSize);
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
