using System.Globalization;
using System.Runtime.InteropServices;
using NCTLWebExplorer.Components;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.DependencyInjection;

namespace NCTLWebExplorer.Pages;

public partial class DeployDetail
{
    [Inject]
    private ILogger<DeployDetail> Logger { get; set; }

    [Parameter]
    public string DeployHash { get; set; }

    private RpcJsonViewer JsonViewerInstance { get; set; }

    private string _deployJson;
    private Deploy _deploy;
    private string _blockHash;
    private ExecutionResult _executionResult;
    
    protected override async Task OnInitializedAsync()
    {
        if (!string.IsNullOrWhiteSpace(DeployHash))
        {
            var response = await CasperRpcService.GetDeploy(DeployHash);
            _deployJson = response.Result.GetRawText();
            var deployResult = response.Parse();
            _deploy = deployResult.Deploy;
            _blockHash = deployResult.ExecutionInfo.BlockHash;
            _executionResult = deployResult.ExecutionInfo.ExecutionResult;
            StateHasChanged();
        }
    }
    
    protected override void OnAfterRender(bool firstRender)
    {
        Console.WriteLine("HOLA");
        Logger.LogTrace("DEPLOY: " + DeployHash);
        if (firstRender || _deployJson != null)
        {
            JsonViewerInstance?.Render(_deployJson);
            _deployJson = null;
        }
    }
    
    private string TimestampToLocalTime(ulong timestamp)
    {
        try
        {
            var isoDateTime = Casper.Network.SDK.Utils.DateUtils.ToISOString(_deploy.Header.Timestamp);
            if(DateTime.TryParse(isoDateTime, out var t))
                return t.ToLocalTime().ToString("", CultureInfo.CurrentCulture);
        }
        catch 
        {
        }
        return timestamp.ToString();
    }
}
