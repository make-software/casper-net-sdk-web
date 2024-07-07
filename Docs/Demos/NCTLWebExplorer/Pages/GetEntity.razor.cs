using System.Text.RegularExpressions;
using NCTLWebExplorer.Components;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.JsonRpc.ResultTypes;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using NCTLWebExplorer.Utils;

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
        SuccessMessage = null;
        
        if (string.IsNullOrWhiteSpace(EntityAddress))
            return;
        
        if (CasperRpcService != null)
        {
            
                if (_queryMethod == (int)AccountInfoMethod.GetEntity)
                {
                    GetKeyFromInput.TryParse(EntityAddress, out var key);
                    
                    if (key == null || 
                        (key is not IEntityIdentifier))
                    {
                        ErrorMessage = "Wrong entity identifier value or format.";
                        return;
                    }

                    try
                    {
                        var rpcResponse = await CasperRpcService.GetEntity(key as IEntityIdentifier);
                        var json = rpcResponse.Result.GetRawText();

                        await JsonViewerInstance.Render(json);

                        SuccessMessage = "Entity info retrieved successfully.";
                    }
                    catch (RpcClientException e)
                    {
                        ErrorMessage = e.Message + ".\n" + e.Data;
                    }
                    catch (Exception e)
                    {
                        ErrorMessage = "Wrong entity identifier value or format.";
                    }
                }
                else if (_queryMethod == (int)AccountInfoMethod.GetAccountInfo)
                {
                    GetKeyFromInput.TryParse(EntityAddress, out var key);
                    
                    if (key == null || 
                        (key is not PublicKey && key is not AccountHashKey))
                    {
                        ErrorMessage = "Wrong entity identifier value or format.";
                        return;
                    }
                    
                    try
                    {
                        RpcResponse<GetAccountInfoResult> rpcResponse;
                        
                        if(key is PublicKey)
                            rpcResponse = await CasperRpcService.GetAccountInfo(key as PublicKey);
                        else 
                            rpcResponse = await CasperRpcService.GetAccountInfo(key as AccountHashKey);
                            
                        var json = rpcResponse.Result.GetRawText();

                        await JsonViewerInstance.Render(json);

                        SuccessMessage = "Account info retrieved successfully.";
                    }
                    catch (RpcClientException e)
                    {
                        ErrorMessage = e.Message + ".\n" + e.Data;
                    }
                    catch (Exception e)
                    {
                        ErrorMessage = "Wrong entity identifier value or format.";
                    }
                }
        }
    }

    private const string GET_ENTITY_LABEL = "Enter a public key, an account hash or an entity address";
    private const string GET_ACCOINT_INFO_LABEL = "Enter a public key or an account hash";
    private string InputLabel = GET_ENTITY_LABEL;
    
    private void OnQueryMethodChange(int value)
    {
        if (_queryMethod == (int)AccountInfoMethod.GetEntity)
            InputLabel = GET_ENTITY_LABEL;
        if (_queryMethod == (int)AccountInfoMethod.GetAccountInfo)
            InputLabel = GET_ACCOINT_INFO_LABEL;
    }
}