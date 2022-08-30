using System.Numerics;
using Casper.Network.SDK.Clients;
using Casper.Network.SDK.Types;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;

namespace CasperERC20.Components;

public partial class ERC20ApproveSpender
{
    [Parameter] public IERC20Client ERC20Client { get; set; }
    
    [Inject] protected CasperSignerInterop SignerInterop { get; set; }

    private CasperClientError _deployAlert;
    
    private string _ownerPublicKey;
    private string _spenderPublicKey;
    private string _approveAmount;

    private async Task OnApproveSpenderClick()
    {
        var ownerPK = PublicKey.FromHexString(_ownerPublicKey);
        var spenderPK = PublicKey.FromHexString(_spenderPublicKey);
        var amount = BigInteger.Parse(_approveAmount);
        var payment = new BigInteger(150000000);

        var spenderAccHash = new AccountHashKey(spenderPK);

        var deployHelper = ERC20Client.ApproveSpender(ownerPK, spenderAccHash, amount,
            payment);

        var signed = await SignerInterop.RequestSignature(deployHelper.Deploy, _ownerPublicKey, null);
        if (signed)
        {
            try
            {
                await deployHelper.PutDeploy();
                _deployAlert.ShowWarning("Waiting for deploy execution results (" + deployHelper.Deploy.Hash + ")");
                
                await deployHelper.WaitDeployProcess();
                
                if (deployHelper.IsSuccess)
                    _deployAlert.ShowSuccess("Deploy executed");
                else
                    _deployAlert.ShowError("Deploy executed with error. " +
                                           deployHelper.ExecutionResult.ErrorMessage);
            }
            catch (Exception e)
            {
                _deployAlert.ShowError("Error in deploy.", e);
            }

            await InvokeAsync(StateHasChanged);
        }
    }
}
