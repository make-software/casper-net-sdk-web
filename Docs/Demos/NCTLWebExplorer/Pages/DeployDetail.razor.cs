using NCTLWebExplorer.Components;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;

namespace NCTLWebExplorer.Pages;

public partial class DeployDetail
{
    [Parameter]
    public string DeployHash { get; set; }

    private RpcJsonViewer JsonViewerInstance { get; set; }

    private string _deployJson;
    private Deploy _deploy;
    private List<ExecutionResult> _executionResults;
    
    protected override async Task OnInitializedAsync()
    {
        if (!string.IsNullOrWhiteSpace(DeployHash))
        {
            var response = await CasperRpcService.GetDeploy(DeployHash);
            _deployJson = response.Result.GetRawText();
            var deployResult = response.Parse();
            _deploy = deployResult.Deploy;
            _executionResults = deployResult.ExecutionResults;
            StateHasChanged();
        }
    }
    
    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender || _deployJson != null)
        {
            JsonViewerInstance?.Render(_deployJson);
            _deployJson = null;
        }
    }
}
