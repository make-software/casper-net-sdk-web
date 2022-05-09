using System.Text.RegularExpressions;
using NCTLWebExplorer.Components;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Radzen;

namespace NCTLWebExplorer.Pages;

public partial class QueryGlobalState
{
    protected RpcJsonViewer JsonViewerInstance { get; set; }

    private string GlobalStateKey { get; set; }
    private string Path { get; set; }
    
    async Task QueryGlobalStateBtnClicked()
    {
        ErrorMessage = null;
        
        if (CasperRpcService != null)
        {
            try
            {
                var rpcResponse = await CasperRpcService.QueryGlobalState(GlobalStateKey, null,
                    string.IsNullOrWhiteSpace(Path) ? null : Path);
                var json = rpcResponse.Result.GetRawText();
                
                var result = Regex.Replace(json, 
                    "\"merkle_proof\":*\"[^\"]+\"", $"\"merkle_proof\":\"skipped\"");

                await JsonViewerInstance.Render(result);
                // await JsonViewerInstance.Filter("/.+stored_value.+/");
            }
            catch (RpcClientException e)
            {
                ErrorMessage = e.Message;
            }
        }
    }
}