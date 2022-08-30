using System.Text.RegularExpressions;
using NCTLWebExplorer.Components;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Radzen;

namespace NCTLWebExplorer.Pages;

public partial class AccountInfo
{
    private string _accountPublicKey;

    private string _accInfoJson;
    protected RpcJsonViewer JsonViewerInstance { get; set; }

    async Task GetAccountInfoBtnClicked()
    {
        SuccessMessage = null;
        ErrorMessage = null;
        
        if (string.IsNullOrWhiteSpace(_accountPublicKey))
        {
            ErrorMessage = "Enter an account public key first.";
            return;
        }
        
        if (CasperRpcService != null)
        {
            try
            {
                var pk = PublicKey.FromHexString(_accountPublicKey);
                var rpcResponse = await CasperRpcService.GetAccountInfo(pk);
                _accInfoJson = rpcResponse.Result.GetRawText();
                
                await JsonViewerInstance.Render(_accInfoJson);

                SuccessMessage = "Account info retrieved successfully.";
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
