using System.Text.RegularExpressions;
using NCTLWebExplorer.Components;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;

namespace NCTLWebExplorer.Pages;

public partial class GetEntity
{
    protected RpcJsonViewer JsonViewerInstance { get; set; }

    private string EntityAddress { get; set; }
    
    async Task GetEntityBtnClicked()
    {
        ErrorMessage = null;
        
        if (CasperRpcService != null)
        {
            try
            {
                IEntityIdentifier entityIdentifier = null;
                if (EntityAddress.StartsWith("entity-") || EntityAddress.StartsWith("account-hash-"))
                    entityIdentifier = GlobalStateKey.FromString(EntityAddress) as IEntityIdentifier;
                else if (EntityAddress.Length == 64)
                    entityIdentifier = GlobalStateKey.FromString("account-hash-" + EntityAddress) as IEntityIdentifier;
                else
                    entityIdentifier = PublicKey.FromHexString(EntityAddress);

                if (entityIdentifier == null)
                {
                    ErrorMessage = "Wrong entity identifier value or format.";
                    return;
                }
                     
                var rpcResponse = await CasperRpcService.GetEntity(entityIdentifier);
                var json = rpcResponse.Result.GetRawText();
                
                var result = Regex.Replace(json, 
                    "\"merkle_proof\":*\"[^\"]+\"", $"\"merkle_proof\":\"skipped\"");

                await JsonViewerInstance.Render(result);
            }
            catch (RpcClientException e)
            {
                ErrorMessage = e.Message;
            }
        }
    }
}