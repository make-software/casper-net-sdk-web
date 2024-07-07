using NCTLWebExplorer.Components;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using NCTLWebExplorer.Utils;
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
            return;

        if (CasperRpcService != null)
        {
            if (_queryMethod == (int)AccountBalanceMethod.GetBalance)
            {
                GetKeyFromInput.TryParse(_accountPublicKey, out var key);

                if (key == null ||
                    (key is not URef))
                {
                    ErrorMessage = "Wrong URef key value or format.";
                    return;
                }

                try
                {
                    var rpcResponse = await CasperRpcService.GetBalance(_accountPublicKey);
                    var json = rpcResponse.Result.GetRawText();

                    await JsonViewerInstance.Render(json);

                    SuccessMessage = "Balance retrieved successfully.";
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
            else if (_queryMethod == (int)AccountBalanceMethod.QueryBalance ||
                     _queryMethod == (int)AccountBalanceMethod.QueryBalanceDetails)
            {
                GetKeyFromInput.TryParse(_accountPublicKey, out var key);

                if (key == null ||
                    (key is not IPurseIdentifier))
                {
                    ErrorMessage = "Wrong purse identifier value or format.";
                    return;
                }

                try
                {
                    if (_queryMethod == (int)AccountBalanceMethod.QueryBalance)
                    {
                        var rpcResponse = await CasperRpcService.QueryBalance(key as IPurseIdentifier);
                        await JsonViewerInstance.Render(rpcResponse.Result.GetRawText());
                    }
                    else
                    {
                        var rpcResponse = await CasperRpcService.QueryBalanceDetails(key as IPurseIdentifier);
                        await JsonViewerInstance.Render(rpcResponse.Result.GetRawText());
                    }

                    SuccessMessage = "Balance retrieved successfully.";
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

    private const string QUERY_BALANCE_LABEL = "Enter a public key, an account hash, an entity address or an URef key";
    private const string GET_BALANCE_LABEL = "Enter an URef key";
    private string InputLabel = QUERY_BALANCE_LABEL;

    private void OnQueryMethodChange(int value)
    {
        if (_queryMethod == (int)AccountBalanceMethod.GetBalance)
            InputLabel = GET_BALANCE_LABEL;
        else
            InputLabel = QUERY_BALANCE_LABEL;
    }
}