using NCTLWebExplorer.Components;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using NCTLWebExplorer.Utils;

namespace NCTLWebExplorer.Pages;

public partial class QueryGlobalState
{
    protected RpcJsonViewer JsonViewerInstance { get; set; }

    private string GlobalStateKey { get; set; }
    private string Path { get; set; }

    async Task QueryGlobalStateBtnClicked()
    {
        ErrorMessage = null;
        SuccessMessage = null;

        if (string.IsNullOrWhiteSpace(GlobalStateKey))
            return;

        if (CasperRpcService != null)
        {
            GetKeyFromInput.TryParse(GlobalStateKey, out var key);

            if (key == null || 
                key is not Casper.Network.SDK.Types.GlobalStateKey)
            {
                ErrorMessage = "Wrong key value or format.";
                return;
            }

            try
            {
                var rpcResponse = await CasperRpcService.QueryGlobalState(key as GlobalStateKey,
                    null,
                    string.IsNullOrWhiteSpace(Path) ? null : Path);
                await JsonViewerInstance.Render(rpcResponse.Result.GetRawText());
                // await JsonViewerInstance.Filter("/.+stored_value.+/");
            }
            catch (RpcClientException e)
            {
                ErrorMessage = e.Message + ".\n" + e.Data;
            }
            catch (Exception e)
            {
                ErrorMessage = "Wrong purse identifier value or format.";
            }
        }
    }
}