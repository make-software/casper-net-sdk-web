using Casper.Network.SDK.JsonRpc;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
using NCTLWebExplorer.Components;
using NCTLWebExplorer.Services;

namespace NCTLWebExplorer.Pages;

public partial class StepDetail
{
    [Parameter] public string EraId { get; set; }
    
    [Inject] protected NavigationManager NavigationManager { get; set; }
    [Inject] protected EventListener EventListener { get; set; }

    private RpcJsonViewer JsonViewerInstance { get; set; }

    private string _stepJson;
    
    protected override async Task OnInitializedAsync()
    {
        try
        {
            var eraId = ulong.Parse(EraId);
            var stepSummary = await EventListener.GetStepByEraId(eraId);
            if (stepSummary != null)
            {
                _stepJson = stepSummary.Json;
            }
            else throw new Exception("Step for era not found in the event store.");
        }
        catch (RpcClientException e)
        {
            ErrorMessage = e.Message + ".\n" + e.Data;
        }
        catch (Exception e)
        {
            ErrorMessage = e.Message;
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