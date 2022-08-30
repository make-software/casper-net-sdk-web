using Blazored.LocalStorage;
using Casper.Network.SDK;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Radzen;

namespace CasperERC20.Pages;

public class ExplorerComponent : ComponentBase
{
    [Inject] protected ICasperClient CasperRpcService { get; set; }

    [Inject] protected CasperSignerInterop SignerInterop { get; set; }

    [Inject] protected NotificationService NotificationService { get; set; }
    
    [Inject] protected ILocalStorageService LocalStorage { get; set; }

    protected string SuccessMessage;
    protected string ErrorMessage;
}
