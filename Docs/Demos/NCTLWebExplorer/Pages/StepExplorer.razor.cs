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
    
    [Inject] protected EventStore EventStore { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            _data = EventStore.Steps.TakeLast(_stepGrid.PageSize).Reverse().ToArray();
            await _stepGrid.Reload();
            await InvokeAsync(StateHasChanged);
            EventStore.StepAdded += async (_) => await InvokeAsync(_stepGrid.Reload);
        }
    }

    private void LoadData(LoadDataArgs args)
    {
        _isLoading = true;
        _count = EventStore.Steps.Count();
        _data = EventStore.Steps.Reverse().Skip(args.Skip ?? 0).Take(_stepGrid.PageSize);
        _isLoading = false;
    }
}