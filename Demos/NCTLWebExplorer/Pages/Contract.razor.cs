using System.Text.Json;
using NCTLWebExplorer.Components;
using Casper.Network.SDK;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Radzen;

namespace NCTLWebExplorer.Pages;

public partial class Contract
{
    private string ContractHash;
    
    protected RpcJsonViewer JsonViewerInstance { get; set; }

    async Task GetContractDetails()
    {
        GlobalStateKey key;
        
        if (string.IsNullOrWhiteSpace(ContractHash))
        {
            ErrorMessage = "Enter a hash key first.";
            return;
        }
        
        key = GlobalStateKey.FromString((ContractHash.Length == 64 ? "hash-" : "" ) + ContractHash);

        if (CasperRpcService != null)
        {
            try
            {
                var rpcResponse = await CasperRpcService.QueryGlobalState(key);
                var json = rpcResponse.Result.GetRawText();
                
                await JsonViewerInstance.Render(json);

                SuccessMessage = "Contract info retrieved successfully.";
            }
            catch (RpcClientException e)
            {
                ErrorMessage = e.Message;
            
                NotificationService.Notify(new NotificationMessage
                    {Severity = NotificationSeverity.Error, Summary = "Error retrieving the account info.", Duration = 4000});
            }
        }
    }
}
