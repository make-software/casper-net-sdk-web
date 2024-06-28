using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
using NCTLWebExplorer.Components;
using NCTLWebExplorer.Services;

namespace NCTLWebExplorer.Pages;

public partial class StepDetail
{
    [Parameter] public string EraId { get; set; }
    
    [Inject] protected NavigationManager NavigationManager { get; set; }
    [Inject] protected EventStore EventStore { get; set; }

    private RpcJsonViewer JsonViewerInstance { get; set; }

    private string _stepJson;
    
    protected override async Task OnInitializedAsync()
    {
        var eraId = ulong.Parse(EraId);
        var stepSummary = EventStore.Steps.FirstOrDefault(step => step.EraId == eraId);
        if (stepSummary != null)
        {
            _stepJson = stepSummary.Json;
        }
        
        NavigationManager.LocationChanged += LocationChanged;
        await base.OnInitializedAsync();
    }
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            JsonViewerInstance?.Render(_stepJson);
        }
    }

    private void LocationChanged(object sender, LocationChangedEventArgs e)
    {
    }
}