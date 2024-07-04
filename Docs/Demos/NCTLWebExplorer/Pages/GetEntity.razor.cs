using System.Text.RegularExpressions;
using NCTLWebExplorer.Components;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;

namespace NCTLWebExplorer.Pages;

public enum AccountInfoMethod
{
    GetEntity = 0,
    GetAccountInfo = 1,
}

public partial class GetEntity
{
    [Parameter] public string AccountPublicKey { get; set; }

    private int _queryMethod;

    protected RpcJsonViewer JsonViewerInstance { get; set; }

    private string EntityAddress { get; set; }
    
    protected override async Task OnInitializedAsync()
    {
        if (!string.IsNullOrWhiteSpace(AccountPublicKey))
        {
            EntityAddress = AccountPublicKey;
            await GetEntityBtnClicked();
            StateHasChanged();
        }
        
        await base.OnInitializedAsync();
    }
    
    async Task GetEntityBtnClicked()
    {
        ErrorMessage = null;
        
        if (CasperRpcService != null)
        {
            try
            {
                if (_queryMethod == (int)AccountInfoMethod.GetEntity)
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
                    
                    SuccessMessage = "Entity info retrieved successfully.";
                }
                else if (_queryMethod == (int)AccountInfoMethod.GetAccountInfo)
                {
                    var pk = PublicKey.FromHexString(EntityAddress);
                    var rpcResponse = await CasperRpcService.GetAccountInfo(pk);
                    var json = rpcResponse.Result.GetRawText();
 
                    var result = Regex.Replace(json, 
                        "\"merkle_proof\":*\"[^\"]+\"", $"\"merkle_proof\":\"skipped\"");
                
                    await JsonViewerInstance.Render(result);

                    SuccessMessage = "Account info retrieved successfully.";
                }
                
            }
            catch (RpcClientException e)
            {
                ErrorMessage = e.Message;
            }
        }
    }
    
    private void OnQueryMethodChange(int value)
    {
        //ignored
    }
}