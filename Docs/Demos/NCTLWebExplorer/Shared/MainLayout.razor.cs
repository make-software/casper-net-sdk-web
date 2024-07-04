using Casper.Network.SDK;
using NCTLWebExplorer.Services;
using NCTLWebExplorer.Utils;
using Casper.Network.SDK.SSE;
using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;

namespace NCTLWebExplorer.Shared;

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

    [Inject] protected EventListener EventListener { get; set; }

    [Inject] protected ICasperClient CasperRpcService { get; set; }

    private SignerStatus _signerStatus = SignerStatus.Unknown;
    private string _activePk = string.Empty;

    private string _buildVersion = "";
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await OnConnectToCondor();

            void SignerUpdateCallback(bool connected, bool unlocked, string key)
            {
                _activePk = key;
                if (!connected)
                {
                    _signerStatus = SignerStatus.Disconnected;
                    Logger.LogDebug("Signer extension not connected to this site.");
                }
                else if (!unlocked)
                {
                    _signerStatus = SignerStatus.Connected;
                    Logger.LogDebug("Signer extension locked.");
                }
                else
                {
                    _signerStatus = SignerStatus.Unlocked;
                    Logger.LogDebug("Signer extension unlocked. Active key: " + _activePk.FormatPublicKey());
                }
                StateHasChanged();
            }

            SignerInterop.OnStateUpdate += SignerUpdateCallback;
            
            var signerPresent = await SignerInterop.IsSignerPresent();

            if (!signerPresent)
            {
                Logger.LogDebug("Signer extension not present.");
                _signerStatus = SignerStatus.NotPresent;
                StateHasChanged();
                return;
            }

            await SignerInterop.AddEventListeners();

            var isConnected = await SignerInterop.IsConnected();
            if (!isConnected)
            {
                Logger.LogDebug("Signer extension not connected to this site.");
                _signerStatus = SignerStatus.Disconnected;
                StateHasChanged();
                return;
            }

            var state = await SignerInterop.GetState();

            SignerUpdateCallback(state.IsConnected, state.IsUnlocked, state.ActivePK);
            
            StateHasChanged();

        }
    }

    protected async Task OnConnectClick()
    {
        if (_signerStatus >= SignerStatus.Disconnected)
            await SignerInterop.RequestConnection();
    }
    
    protected async Task OnConnectToCondor()
    {
        var response = await CasperRpcService.GetNodeStatus();
        _buildVersion = response.Parse().BuildVersion;
        Console.WriteLine("BUILD VERSION: " + response.Result.GetRawText());
        if (_buildVersion.StartsWith("2."))
        {
            EventListener.SwitchToNodeVersion2();
        }
        StateHasChanged();
    }
}
