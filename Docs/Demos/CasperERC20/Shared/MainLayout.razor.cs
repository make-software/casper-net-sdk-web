using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;

namespace CasperERC20.Shared;

enum SignerStatus
{
    Unknown,
    NotPresent,
    Disconnected,
    Connected,
    Unlocked
}

public partial class MainLayout
{
    [Inject] protected CasperSignerInterop SignerInterop { get; set; }

    [Inject] protected ILogger<MainLayout> Logger { get; set; }
    
    private SignerStatus _signerStatus = SignerStatus.Unknown;
    private string _activePk = string.Empty;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            SignerInterop.OnStateUpdate += (connected, unlocked, key) =>
            {
                _activePk = key;
                if (!connected)
                    _signerStatus = SignerStatus.Disconnected;
                else if (!unlocked)
                    _signerStatus = SignerStatus.Connected;
                else
                    _signerStatus = SignerStatus.Unlocked;
                StateHasChanged();
            };
            var signerPresent = await SignerInterop.IsSignerPresent();

            if (!signerPresent)
            {
                Logger.LogDebug("Signer extension not present.");
                _signerStatus = SignerStatus.NotPresent;
                StateHasChanged();
                return;
            }

            await SignerInterop.AddEventListeners();

            var state = await SignerInterop.GetState();

            if (!state.IsConnected)
            {
                Logger.LogDebug("Signer extension not connected to this site.");
                _signerStatus = SignerStatus.Disconnected;
                StateHasChanged();
                return;
            }

            _signerStatus = state.IsUnlocked ? SignerStatus.Unlocked : SignerStatus.Connected;
            if (state.IsUnlocked)
            {
                _activePk = state.ActivePK;
                Logger.LogDebug("Signer extension unlock. Active key: " + GetActivePKLabel());
            }
            else
            {
                Logger.LogDebug("Signer extension locked.");
            }
            
            StateHasChanged();
        }
    }

    private async Task OnConnectClick()
    {
        if (_signerStatus >= SignerStatus.Disconnected)
            await SignerInterop.RequestConnection();
    }

    private string GetActivePKLabel()
    {
        return $"{_activePk[..5]}..{_activePk[28..32]}";
    }
}
