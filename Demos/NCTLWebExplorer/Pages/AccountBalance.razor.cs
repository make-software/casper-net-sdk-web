using NCTLWebExplorer.Components;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Radzen;

namespace NCTLWebExplorer.Pages;

public partial class AccountBalance
{
    private string _accountPublicKey;
    private string _balance;

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
                var pk = PublicKey.FromHexString(_accountPublicKey);
                var rpcResponse = await CasperRpcService.GetAccountBalance(pk);

                var accBalanceJson = rpcResponse.Result.GetRawText();
                
                await JsonViewerInstance.Render(accBalanceJson);

                var result = rpcResponse.Parse();
                
                Console.WriteLine("BALANCE: " + result.BalanceValue);
                _balance = result.BalanceValue.ToString();

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
}
