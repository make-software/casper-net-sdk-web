using System.Numerics;
using Casper.Network.SDK.Clients;
using Casper.Network.SDK.Types;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;

namespace CasperERC20.Components;

public partial class ERC20TransferTo
{
    [Parameter] public IERC20Client ERC20Client { get; set; }
    
    [Inject] protected CasperSignerInterop SignerInterop { get; set; }

    private CasperClientError _deployAlert;

    private string _sourcePublicKey;
    private string _targetPublicKey;
    private string _amount;

    private async Task OnTransferClick()
    {
        var srcPK = PublicKey.FromHexString(_sourcePublicKey);
        var tgtPK = PublicKey.FromHexString(_targetPublicKey);
        var amount = BigInteger.Parse(_amount);
        var payment = new BigInteger(200000000);
        
        var tgtAccHash = new AccountHashKey(tgtPK);

        var deployHelper = ERC20Client.TransferTokens(srcPK, tgtAccHash, amount,
            payment);

        var signed = await SignerInterop.RequestSignature(deployHelper.Deploy, _sourcePublicKey, _targetPublicKey);
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
