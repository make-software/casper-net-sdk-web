using System.Numerics;
using Casper.Network.SDK;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Radzen;

namespace NCTLWebExplorer.Pages;

public partial class LedgerTest
{
    [Inject] private CasperLedgerInterop LedgerInterop { get; set; }

    private int _selectedAccountIdx = 0;
    private string _selectedAccount = "";

    private CasperLedgerInterop.AppInfo _appInfo = null;
    private CasperLedgerInterop.CasperAppVersion _appVersion = null;

    private string _recipientPublicKey;
    private string _transferAmount;
    private string _ledgerSignNotice;
    
    protected override void OnInitialized()
    {
        LedgerInterop.OnStateUpdate += async (unlocked, key) =>
        {
            await OnRefreshLedgerInfo();
        };
    }
    
    private async Task OnRefreshLedgerInfo()
    {
        Console.WriteLine("OnRefreshLedgerInfo");
        _appInfo = await LedgerInterop.GetAppInfo();

        if (_appInfo?.AppName == "Casper")
            _appVersion = await LedgerInterop.GetCasperAppVersion();
        else
            _appVersion = null;
        
        StateHasChanged();
    }
    
    private async Task OnLedgerConnect()
    {
        await LedgerInterop.Connect();
        _selectedAccount = LedgerInterop.ActivePK ?? "";
    }
    
    private async Task OnLedgerDisconnect()
    {
        await LedgerInterop.Disconnect();
        _selectedAccount = LedgerInterop.ActivePK ?? "";
    }
    
    private async Task OnLedgerSelectAccount(int acctIdx)
    {
        await LedgerInterop.SelectAccount(acctIdx);
        _selectedAccount = LedgerInterop.ActivePK ?? "";
    }

    private async Task OnLedgerShowAccount(int acctIdx)
    {
        await LedgerInterop.ShowAccount(acctIdx);
        _selectedAccount = LedgerInterop.ActivePK ?? "";
    }
    
    private async Task OnLedgerSign()
    {
        var deploy = DeployTemplates.StandardTransfer(PublicKey.FromHexString(_selectedAccount),
            PublicKey.FromHexString(_recipientPublicKey),
            BigInteger.Parse(_transferAmount) * 1_000_000_000, 
            100_000_000, 
            "casper-net-1",
            1);

        _ledgerSignNotice = "Review and approve the transaction in your Ledger display";
        
        var signed = await LedgerInterop.RequestSignature(deploy);

        _ledgerSignNotice = string.Empty;
        
        if (signed)
        {
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
        }
    }
}
