using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using NCTLWebExplorer.Models;
using NCTLWebExplorer.Services;
using Radzen;
using Radzen.Blazor;

namespace NCTLWebExplorer.Pages;

public partial class StepExplorer : ComponentBase
{
    private RadzenDataGrid<StepSummary> _stepGrid;
    private IEnumerable<StepSummary> _data = new List<StepSummary>();

    private int _count;
    private bool _isLoading;
    
    [Inject] protected EventListener EventListener { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            var paginatedData = await EventListener.GetSteps(0, _stepGrid.PageSize);
            _count = paginatedData.ItemCount;
            _data = paginatedData.Data;
            await _stepGrid.Reload();
            await InvokeAsync(StateHasChanged);
            EventListener.StepAdded += async (_) => await InvokeAsync(_stepGrid.Reload);
        }
    }

    private async Task LoadData(LoadDataArgs args)
    {
        _isLoading = true;
        var paginatedData = await EventListener.GetSteps(args.Skip ?? 0, _stepGrid.PageSize);
        _count = paginatedData.ItemCount;
        _data = paginatedData.Data;
        _isLoading = false;
    }
}