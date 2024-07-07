using Casper.Network.SDK;
using NCTLWebExplorer.Services;
using NCTLWebExplorer.Utils;
using Casper.Network.SDK.SSE;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;

namespace NCTLWebExplorer.Shared;


public partial class MainLayout
{
    [Inject] protected ILogger<MainLayout> Logger { get; set; }

    [Inject] protected EventListener EventListener { get; set; }

    [Inject] protected ICasperClient CasperRpcService { get; set; }

    private string _activePk = string.Empty;

    private string _statusMessage = "";
    private string _buildVersion = "";
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await OnConnectToCondor();

            StateHasChanged();
        }
    }

    protected async Task OnConnectToCondor()
    {
        try
        {
            var response = await CasperRpcService.GetNodeStatus();
            _buildVersion = response.Parse().BuildVersion;
            Logger.LogInformation("BUILD VERSION: " + response.Result.GetRawText());
            if (_buildVersion.StartsWith("2."))
            {
                EventListener.SwitchToNodeVersion2();
            }

            _statusMessage = "";
        }
        catch (Exception e)
        {
            _statusMessage = "Cannot connect to the node. Click refresh to retry in few seconds";
            Logger.LogError("Cannot get node status from RPC interface. Error: " + e.Message);
        }
        StateHasChanged();
    }
}
