using System.Globalization;
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
    private string _transferAmount = "2.5";
       
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            try
            {
                await _csprClickInterop.SetDotNetInstance();
                Console.WriteLine("Getting key");
                _originPublicKey = await _csprClickInterop.GetActiveKey();
            }
            catch (Exception e)
            {
                Console.WriteLine("Error getting key");
                Console.WriteLine(e.Message);
            }
        
            _csprClickInterop.OnStateUpdate += (type, key) =>
            {
                _originPublicKey = key;
                StateHasChanged();
            };
            StateHasChanged();
        }
    }

    async Task SendTransferBtnClicked()
    {
        ErrorMessage = null;
        SuccessMessage = null;
        
        if (string.IsNullOrWhiteSpace(_originPublicKey))
        {
            NotificationService.Notify(new NotificationMessage
            {
                Severity = NotificationSeverity.Error, Summary = "Sender account not valid.",
                Duration = 4000
            });
            return;
        }

        try
        {
            if (string.IsNullOrWhiteSpace(_targetPublicKey))
                throw new Exception();

            if(_originPublicKey == _targetPublicKey)
                throw new Exception();

            var pk = PublicKey.FromHexString(_targetPublicKey);
        }
        catch (Exception e)
        {
            NotificationService.Notify(new NotificationMessage
            {
                Severity = NotificationSeverity.Error, Summary = "Recipient must be a valid public key.",
                Duration = 4000
            });
            return;
        }
        
        BigInteger amount;

        try
        {
            if (string.IsNullOrWhiteSpace(_transferAmount))
                throw new Exception();

            var cspr = ParseFloat(_transferAmount);
            if (cspr < 2.5)
                throw new Exception();
            var motes = (ulong)(cspr * 1_000_000_000);
            amount = new BigInteger(motes);
        }
        catch (Exception e)
        {
            NotificationService.Notify(new NotificationMessage
            {
                Severity = NotificationSeverity.Error, Summary = "Amount not valid",
                Duration = 4000
            });
            return;
        }

        var casperService = CasperRpcService as CasperRPCService;

        var deploy = DeployTemplates.StandardTransfer(
            PublicKey.FromHexString(_originPublicKey), 
            PublicKey.FromHexString(_targetPublicKey),
            amount,
            new BigInteger(100_000_000),
            casperService?.ChainName,
            1);

        deploy = await _csprClickInterop.SignDeploy(deploy, _originPublicKey);

        if (deploy is null)
        {
            NotificationService.Notify(new NotificationMessage
            {
                Severity = NotificationSeverity.Error, Summary = "Error getting the deploy signature.",
                Duration = 4000
            });
            return;
        }
        
        try
        {
            var rpcResponse = await CasperRpcService?.PutDeploy(deploy)!;
            var result = rpcResponse.Parse();
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
    
    public static float ParseFloat(string input)
    {
        // Create a NumberFormatInfo object to allow both comma and dot as decimal separators
        NumberFormatInfo format = new NumberFormatInfo();
        format.NumberDecimalSeparator = ",";
        
        // Try to parse with comma as decimal separator
        if (float.TryParse(input, NumberStyles.Float, format, out float result))
        {
            return result;
        }

        // If that fails, try parsing with dot as decimal separator
        format.NumberDecimalSeparator = ".";
        if (float.TryParse(input, NumberStyles.Float, format, out result))
        {
            return result;
        }

        // Handle the case where parsing fails (optional)
        throw new FormatException($"Unable to parse '{input}' as a float.");
    }
}