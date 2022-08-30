using System.Numerics;
using Casper.Network.SDK;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Casper.Network.SDK.Web;
using Radzen;

namespace NCTLWebExplorer.Pages;

public partial class TransferCspr
{
    private string _originPublicKey;
    private string _targetPublicKey;
    private string _transferAmount;
       
    async Task SendTransferBtnClicked()
    {
        ErrorMessage = null;
        SuccessMessage = null;
        
        var state = await SignerInterop.GetState();

        if (state is not {IsUnlocked: true})
        {
            NotificationService.Notify(new NotificationMessage
            {
                Severity = NotificationSeverity.Error, Summary = "Unlock Casper Signer to sign the deploy",
                Duration = 4000
            });
            return;
        }

        var casperService = CasperRpcService as CasperRPCService;

        var deploy = DeployTemplates.StandardTransfer(PublicKey.FromHexString(state.ActivePK),
            PublicKey.FromHexString(_targetPublicKey),
            BigInteger.Parse(_transferAmount) * 1_000_000_000,
            new BigInteger(100_000_000),
            casperService?.ChainName,
            1);

        deploy = await SignDeployWithSigner(deploy, state.ActivePK, _targetPublicKey);

        try
        {
            var rpcResponse = await CasperRpcService?.PutDeploy(deploy)!;
            var result = rpcResponse.Parse();
            Console.WriteLine("RESULT: " + result.DeployHash);
            SuccessMessage = "<b>Deploy hash:&nbsp;</b>" + result.DeployHash;
            
            NotificationService.Notify(new NotificationMessage
                {Severity = NotificationSeverity.Success, Summary = "Transfer successfully sent.", Duration = 4000});
        }
        catch (RpcClientException e)
        {
            this.ErrorMessage = e.Message;
            
            NotificationService.Notify(new NotificationMessage
                {Severity = NotificationSeverity.Error, Summary = "Error sending the transaction.", Duration = 4000});
        }

        _targetPublicKey = null;
        _transferAmount = null;
    }
}
