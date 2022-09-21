using System.Text.RegularExpressions;
using Casper.Network.SDK.JsonRpc;
using NCTLWebExplorer.Components;

namespace NCTLWebExplorer.Pages;

public partial class DictionaryItem
{
    protected RpcJsonViewer JsonViewerInstance { get; set; }

    private string DictionaryUref { get; set; }
    private string DictionaryItemKey { get; set; }
    
    async Task QueryDictionaryItemClicked()
    {
        ErrorMessage = null;
        
        if (CasperRpcService != null)
        {
            try
            {
                var rpcResponse = await CasperRpcService.GetDictionaryItemByURef(DictionaryUref, DictionaryItemKey);
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
