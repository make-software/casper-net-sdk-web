using System.Numerics;
using NCTLWebExplorer.Components;
using Casper.Network.SDK;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Casper.Network.SDK.Utils;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Radzen;
using FileInfo = Radzen.FileInfo;

namespace NCTLWebExplorer.Pages;

public partial class SendDeploy
{
    private RpcJsonViewer JsonViewerInstance { get; set; }

    private string _accountPk;
    private string _paymentAmount;

    private int _sessionType;
    private string _contractHash;
    private string _contractVersion;
    private string _contractName;
    private string _entryPoint;

    private byte[] _wasmDeployBytes;

    private NamedArgumentCollection _namedArgsCollection;

    private void OnSessionTypeChange(int value)
    {
        //ignored
    }

    private void LoadFiles(InputFileChangeEventArgs e)
    {
        var browserFile = e.File;
        _wasmDeployBytes = new byte[browserFile.Size];
        var memoryStream = new MemoryStream(_wasmDeployBytes);
        browserFile.OpenReadStream().CopyToAsync(memoryStream);
    }

    void OnComplete(UploadCompleteEventArgs args)
    {
        //ignored
    }

    async Task SendDeployBtnClicked()
    {
        // // check account is valid
        // //
        // var state = await SignerInterop.GetState();
        //
        // if (state is not {IsUnlocked: true})
        // {
        //     NotificationService.Notify(new NotificationMessage
        //     {
        //         Severity = NotificationSeverity.Error, Summary = "Unlock Casper Signer to sign the deploy",
        //         Duration = 4000
        //     });
        //     return;
        // }
        //
        // // check payment amount is valid
        // //
        // if (string.IsNullOrWhiteSpace(_paymentAmount) ||
        //     !BigInteger.TryParse(_paymentAmount, out var amount) ||
        //     amount <= 0)
        // {
        //     NotificationService.Notify(new NotificationMessage
        //     {
        //         Severity = NotificationSeverity.Error, Summary = "Add a valid payment amount.",
        //         Duration = 4000
        //     });
        //     return;
        // }
        //
        // // Check session data is complete
        // //
        // try
        // {
        //     if(_sessionType == 0 && _wasmDeployBytes == null)
        //         throw new Exception("Load a Wasm file to deploy.");
        //     if ((_sessionType == 1 || _sessionType == 3) &&
        //         string.IsNullOrWhiteSpace(_contractHash))
        //         throw new Exception("Contract Hash cannot be empty.");
        //     if ((_sessionType == 2 || _sessionType == 4) &&
        //         string.IsNullOrWhiteSpace(_contractName))
        //         throw new Exception("Contract Name cannot be empty.");
        //     if((_sessionType  > 0 && _sessionType < 5) &&
        //        string.IsNullOrWhiteSpace(_entryPoint))
        //         throw new Exception("Entry point cannot be empty.");
        // }
        // catch (Exception e)
        // {
        //     NotificationService.Notify(new NotificationMessage
        //     {
        //         Severity = NotificationSeverity.Error,
        //         Summary = e.Message,
        //         Duration = 4000
        //     });
        //     await InvokeAsync(StateHasChanged);
        //     return;
        // }
        //
        // // Check that parameters are valid
        // //
        // List<NamedArg> parameters;
        // try
        // {
        //     parameters = _namedArgsCollection.GetParameters();
        // }
        // catch (Exception e)
        // {
        //     NotificationService.Notify(new NotificationMessage
        //     {
        //         Severity = NotificationSeverity.Error,
        //         Summary = e.Message + Environment.NewLine + "Review the parameters collection.",
        //         Duration = 4000
        //     });
        //     return;
        // }
        //
        // if (CasperRpcService != null)
        // {
        //     var casperService = (CasperRPCService) CasperRpcService;
        //
        //     var payment = (ExecutableDeployItem) new ModuleBytesDeployItem(BigInteger.Parse(_paymentAmount));
        //
        //     uint? version = string.IsNullOrWhiteSpace(_contractVersion) ? null : uint.Parse(_contractVersion);
        //
        //     ExecutableDeployItem session = _sessionType switch
        //     {
        //         0 => new ModuleBytesDeployItem(_wasmDeployBytes, parameters),
        //         1 => new StoredContractByHashDeployItem(_contractHash, _entryPoint, parameters),
        //         2 => new StoredContractByNameDeployItem(_contractName, _entryPoint, parameters),
        //         3 => new StoredVersionedContractByHashDeployItem(_contractHash, version, _entryPoint, parameters),
        //         4 => new StoredVersionedContractByNameDeployItem(_contractName, version, _entryPoint, parameters),
        //         5 => new TransferDeployItem() {RuntimeArgs = parameters},
        //         _ => null
        //     };
        //
        //     var deployHeader = new DeployHeader()
        //     {
        //         Account = PublicKey.FromHexString(_accountPk),
        //         ChainName = casperService.ChainName,
        //         Timestamp = DateUtils.ToEpochTime(DateTime.UtcNow),
        //         Ttl = 1800000,
        //         GasPrice = 1
        //     };
        //
        //     var deploy = new Deploy(deployHeader, payment, session);
        //
        //     deploy = await SignDeployWithSigner(deploy, state.ActivePK, null);
        //
        //     try
        //     {
        //         var rpcResponse = await CasperRpcService?.PutDeploy(deploy)!;
        //         var result = rpcResponse.Parse();
        //         Console.WriteLine("RESULT: " + result.DeployHash);
        //         SuccessMessage = "<b>Deploy hash:&nbsp;</b>" + result.DeployHash;
        //
        //         JsonViewerInstance?.Render(deploy.SerializeToJson());
        //
        //         NotificationService.Notify(new NotificationMessage
        //             {Severity = NotificationSeverity.Success, Summary = "Deploy successfully sent.", Duration = 4000});
        //
        //         StateHasChanged();
        //     }
        //     catch (RpcClientException e)
        //     {
        //         ErrorMessage = e.Message;
        //
        //         NotificationService.Notify(new NotificationMessage
        //             {Severity = NotificationSeverity.Error, Summary = "Error sending the deploy..", Duration = 4000});
        //     }
        // }
    }
}
