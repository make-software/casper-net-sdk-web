using Radzen;

namespace NCTLWebExplorer.Pages;

public partial class Signer
{
    private string _messageToSign;
    private string _signature;

    private async Task SignMessage()
    {
        var state = await SignerInterop.GetState();

        try
        {
            _signature = await SignerInterop.SignMessage(_messageToSign, state.ActivePK);
        }
        catch (Exception e)
        {
            NotificationService.Notify(new NotificationMessage
            {
                Severity = NotificationSeverity.Error,
                Summary = e.Message,
                Duration = 4000
            });

            Console.WriteLine(e);
        }
    }
}
