using Casper.Network.SDK.Clients;
using Casper.Network.SDK.Types;
using CasperERC20.Components;
using Microsoft.AspNetCore.Components;

namespace CasperERC20.Pages;

public partial class ViewContract
{
    [Inject] private IERC20Client ERC20Client { get; set; }

    [Parameter] public string ContractHash { get; set; }
    
    private CasperClientError _detailsError;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            try
            {
                await ERC20Client.SetContractHash(ContractHash);
                await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                _detailsError.ShowError("Cannot retrieve contract named keys", e);
            }
        }
    }
    
    private string _subjectPK;
    private MarkupString _balanceResult;
    private CasperClientError _getBalanceError;

    private async Task OnGetBalanceClick()
    {
        _getBalanceError.Hide();
        
        try
        {
            var accHash = new AccountHashKey(PublicKey.FromHexString(_subjectPK));
            var balance = await ERC20Client.GetBalance(accHash);

            _balanceResult = new MarkupString($@"<table class='table rpc-results mt-4'><tbody>
                        <tr><th scope='row'>Public Key</th><td>{_subjectPK}</td></tr>
                        <tr><th scope='row'>Balance</th><td>{balance}</td></tr>
                        </tbody></table>" + _balanceResult);

            _subjectPK = string.Empty;
        }
        catch (Exception e)
        {
            _getBalanceError?.ShowError("Account not found", e);
        }

        await InvokeAsync(StateHasChanged);
    }

    private string _ownerPK;
    private string _spenderPK;
    private MarkupString _allowanceResult;
    private CasperClientError _getAllowanceError;

    private async Task OnGetAllowanceClick()
    {
        _getAllowanceError.Hide();
        
        try
        {
            var ownerAccHash = new AccountHashKey(PublicKey.FromHexString(_ownerPK));
            var spenderAccHash = new AccountHashKey(PublicKey.FromHexString(_spenderPK));
            var allowance = await ERC20Client.GetAllowance(ownerAccHash, spenderAccHash);

            _allowanceResult = new MarkupString($@"<table class='table rpc-results mt-4'><tbody>
                        <tr><th scope='row'>Owner Public Key</th><td>{_ownerPK}</td></tr>
                        <tr><th scope='row'>Spender Public Key</th><td>{_spenderPK}</td></tr>
                        <tr><th scope='row'>Approved Balance</th><td>{allowance}</td></tr>
                        </tbody></table>" + _allowanceResult);

            _ownerPK = string.Empty;
            _spenderPK = string.Empty;
        }
        catch (Exception e)
        {
            _getAllowanceError?.ShowError("Account not found", e);
        }

        await InvokeAsync(StateHasChanged);
    }
}
