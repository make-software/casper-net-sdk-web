using Casper.Network.SDK;
using NCTLWebExplorer.Services;
using NCTLWebExplorer.Utils;
using Casper.Network.SDK.SSE;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Radzen;

namespace NCTLWebExplorer.Shared;


public partial class MainLayout
{
    [Inject] protected ILogger<MainLayout> Logger { get; set; }

    [Inject] protected EventListener EventListener { get; set; }

    [Inject] protected ICasperClient CasperRpcService { get; set; }
    
    [Inject] protected NotificationService NotificationService { get; set; }

    [Inject] protected IJSRuntime JsRuntime { get; set; }

    [Inject] protected IConfiguration Config { get; set; }

    private string _activePk = string.Empty;

    private string _statusMessage = "";
    private string _buildVersion = "";
    private bool sidebarExpanded = true;
    
    private string _PageTitle = "Casper Mini explorer";

    protected override async Task OnInitializedAsync()
    {
        if (Config["PageTitle"] != null)
            _PageTitle = Config["PageTitle"];
    }
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await GetNodeStatus();
            StateHasChanged();
        }
    }

    protected async Task OnConnectToCondor()
    {
        var nodeStatus = await GetNodeStatus();
        if (nodeStatus != null)
        {
            await JsRuntime.InvokeVoidAsync("logToConsole", nodeStatus);

            NotificationService.Notify(new NotificationMessage
                {Severity = NotificationSeverity.Info, Summary = "Node status logged to console.", Duration = 3000});            
        }
        StateHasChanged();
    }

    private async Task<string> GetNodeStatus()
    {
        try
        {
            var response = await CasperRpcService.GetNodeStatus();
            var nodeStatus = response.Result.GetRawText();
            _buildVersion = response.Parse().BuildVersion;

            if (_buildVersion.StartsWith("2."))
            {
                EventListener.SwitchToNodeVersion2();
            }

            _statusMessage = "";
            return nodeStatus;
        }
        catch (Exception e)
        {
            _statusMessage = "Cannot connect to the node. Click refresh to retry in few seconds";
            Logger.LogError("Cannot get node status from RPC interface. Error: " + e.Message);
        }

        return null;
    }
}
