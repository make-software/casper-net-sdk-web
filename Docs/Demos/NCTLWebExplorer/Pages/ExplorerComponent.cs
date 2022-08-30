using Casper.Network.SDK;
using Casper.Network.SDK.Types;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Radzen;

namespace NCTLWebExplorer.Pages;

public class ExplorerComponent : ComponentBase
{
    [Inject] protected ICasperClient CasperRpcService { get; set; }

    [Inject] protected CasperSignerInterop SignerInterop { get; set; }

    [Inject] protected NotificationService NotificationService { get; set; }
    
    protected string SuccessMessage;
    protected string ErrorMessage;

    protected async Task<Deploy> SignDeployWithSigner(Deploy deploy, string srcPk, string tgtPk)
    {
        await SignerInterop.RequestSignature(deploy, srcPk, tgtPk);

        return deploy;
    }
}
