using NCTLWebExplorer.Components;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Radzen;

namespace NCTLWebExplorer.Pages;

public enum AccountBalanceMethod
{
    QueryBalance = 0,
    QueryBalanceDetails = 1,
    GetBalance = 2,
}

public partial class GetBalance
{
    private int _queryMethod;

    private string _accountPublicKey;

    protected RpcJsonViewer JsonViewerInstance { get; set; }
    
    async Task GetAccountBalanceBtnClicked()
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
                if (_queryMethod == (int)AccountBalanceMethod.GetBalance)
                {
                    var rpcResponse = await CasperRpcService.GetBalance(_accountPublicKey);
                    var accBalanceJson = rpcResponse.Result.GetRawText();
                
                    await JsonViewerInstance.Render(accBalanceJson);
                }
                else if (_queryMethod == (int)AccountBalanceMethod.QueryBalance)
                {
                    var pk = PublicKey.FromHexString(_accountPublicKey);
                    var rpcResponse = await CasperRpcService.QueryBalance(pk);
                    var accBalanceJson = rpcResponse.Result.GetRawText();
                
                    await JsonViewerInstance.Render(accBalanceJson);
                }
                else if (_queryMethod == (int)AccountBalanceMethod.QueryBalanceDetails)
                {
                    var pk = PublicKey.FromHexString(_accountPublicKey);
                    var rpcResponse = await CasperRpcService.QueryBalanceDetails(pk);
                    var accBalanceJson = rpcResponse.Result.GetRawText();
                
                    await JsonViewerInstance.Render(accBalanceJson);
                }
                SuccessMessage = "Account balance retrieved successfully.";
            }
            catch (RpcClientException e)
            {
                ErrorMessage = e.Message;
            
                NotificationService.Notify(new NotificationMessage
                    {Severity = NotificationSeverity.Error, Summary = "Error retrieving the account balance.", Duration = 4000});
            }
        }
    }
    
    private void OnQueryMethodChange(int value)
    {
        //ignored
    }
}
