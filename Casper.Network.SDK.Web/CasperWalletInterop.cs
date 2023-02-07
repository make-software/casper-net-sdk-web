using System;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Casper.Network.SDK.Types;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop;

namespace Casper.Network.SDK.Web
{
    /// <summary>
    /// Delegate to receive wallet state update events.
    /// </summary>
    public delegate void WalletStateUpdateEventHandler(bool isConnected, bool isUnlocked, string activePublicKey, string eventName);

    /// <summary>
    /// Delegate to receive wallet state update events.
    /// </summary>
    public delegate Task WalletStateUpdateEventHandlerAsync(bool isConnected, bool isUnlocked, string activePublicKey, string eventName);
    
    public struct CasperWalletEventTypes
    {
        public const string ACTIVE_KEY_CHANGED = "casper-wallet:activeKeyChanged";
        public const string CONNECTED = "casper-wallet:connected";
        public const string DISCONNECTED = "casper-wallet:disconnected";
        public const string LOCKED = "casper-wallet:locked";
        public const string TAB_CHANGED = "casper-wallet:tabChanged";
        public const string UNLOCKED = "casper-wallet:unlocked";
    }
    
    /// <summary>
    /// Service class to interact with Wallet extension in the browser.
    /// </summary>
    public class CasperWalletInterop : IWallet, IAsyncDisposable
    {
        private readonly ILogger<CasperWalletInterop> _logger;

        private readonly Lazy<Task<IJSObjectReference>> _moduleTask;

        public event WalletStateUpdateEventHandler OnStateUpdate;

        public event WalletStateUpdateEventHandlerAsync OnStateUpdateAsync;
        
        public CasperWalletInterop(IJSRuntime jsRuntime, ILogger<CasperWalletInterop> logger)
        {
            _logger = logger;
            
            _moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/Casper.Network.SDK.Web/casperWalletInterop.js").AsTask());
        }

        private async Task _callWalletInterop(string method, params object[] par)
        {
            var module = await _moduleTask.Value;
            await module.InvokeVoidAsync(method, par);
        }

        private async Task<T> _callWalletInterop<T>(string method, params object[] par)
        {
            var module = await _moduleTask.Value;
            return await module.InvokeAsync<T>(method, par);
        }

        /// <summary>
        /// Returns true if the wallet extension is installed in the browser.
        /// </summary>
        public async Task<bool> IsWalletPresent()
        {
            var module = await _moduleTask.Value;
            return await module.InvokeAsync<bool>("isCasperWalletExtensionPresent");
        }

        /// <summary>
        /// Call this method once to subscribe to the wallet extension events. Add a delegate method
        /// to `OnStateUpdate` to receive callbacks every time an event is triggered.
        /// </summary>
        public async Task AddEventListeners() =>
            await _callWalletInterop("addEventListeners",
                DotNetObjectReference.Create<CasperWalletInterop>(this));

        /// <summary>
        /// Method called by javascript to send a wallet state update. Should not be called
        /// by the user.
        /// </summary>
        [JSInvokable("UpdateState")]
        public async Task UpdateState(bool isConnected, bool isUnlocked, string activePublicKey, string eventName)
        {
            _logger.LogDebug("Wallet Updated state: " +
                $"{{IsConnected:{isConnected}, IsUnlocked:{isUnlocked}, ActivePK:{activePublicKey}, Event:{eventName}}}");
            OnStateUpdate?.Invoke(isConnected, isUnlocked, activePublicKey, eventName);

            if (OnStateUpdateAsync != null)
                await OnStateUpdateAsync(isConnected, isUnlocked, activePublicKey, eventName);
        }

        /// <summary>
        /// Gets a string with the version of the wallet extension installed.
        /// </summary>
        public async Task<string> GetVersion() =>
            await _callWalletInterop<string>("getVersion");

        /// <summary>
        /// Gets the current state of the wallet extension.
        /// </summary>
        public async Task<WalletState> GetState()
        {
            return await _callWalletInterop<WalletState>("getCasperWalletState");
        }

        /// <summary>
        /// Returns true if the site is connected to the wallet extension. The user must grant
        /// the connection to the site to access the signing functionalities.
        /// </summary>
        public async Task<bool> IsConnected() =>
            await _callWalletInterop<bool>("isConnected");

        /// <summary>
        /// Request the user to grant a connection between the current site and the wallet
        /// extension. This step is required to access the signing functionalities.
        /// </summary>
        public async Task RequestConnection() =>
            await _callWalletInterop("requestConnection");

        /// <summary>
        /// Disconnects the site from the wallet extension.
        /// </summary>
        public async Task DisconnectFromSite() =>
            await _callWalletInterop("disconnectFromSite");

        /// <summary>
        /// Request the extension to allow the user to switch to another account
        /// </summary>
        public async Task SwitchAccount() =>
            await _callWalletInterop("switchAccount");
        
        /// <summary>
        /// Gets the selected (or active) public key.
        /// </summary>
        public async Task<string> GetActivePublicKey() =>
            await _callWalletInterop<string>("getActivePublicKey");

        /// <summary>
        /// Sends a deploy to the wallet to request the user to sign it.
        /// </summary>
        /// <param name="deploy">Deploy object to add an approval signature.</param>
        /// <param name="srcPK">Public key from the key pair that signs the deploy. Must match the active public key.</param>
        /// <param name="tgtPK">In case of a transfer, target public key of the transfer.</param>
        /// <returns>true if the user signed the deploy. false otherwise.</returns>
        public async Task<bool> RequestSignature(Deploy deploy, string srcPk, string tgtPk)
        {
            var json = deploy.SerializeToJson();

            try
            {
                var walletResult = await _callWalletInterop<string>("sign", json, srcPk.ToLower(), tgtPk.ToLower());

                if (string.IsNullOrWhiteSpace(walletResult))
                    return false;
                
                var approval = new DeployApproval()
                {
                    Signer =
                        PublicKey.FromHexString(srcPk),
                    Signature = Signature.FromHexString(walletResult)
                };
                deploy.Approvals.Add(approval);
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR in RequestSignature: " + e.Message);
                return false;
            }
            return true;
        }
        
        /// <summary>
        /// Signs a string/message.
        /// </summary>
        /// <param name="message">Message to sign.</param>
        /// <param name="signingPublicKey">Public key from the key pair that signs the message.</param>
        /// <returns></returns>
        public async Task<string> SignMessage(string message, string signingPublicKey)
        {
            return await _callWalletInterop<string>("signMessage", message, signingPublicKey);
        }

        public async ValueTask DisposeAsync()
        {
            if (_moduleTask.IsValueCreated)
            {
                var module = await _moduleTask.Value;
                await module.DisposeAsync();
            }
        }
    }

    public class WalletState
    {
        [JsonPropertyName("isConnected")] public bool IsConnected { get; set; }
        [JsonPropertyName("isUnlocked")] public bool IsUnlocked { get; set; }
        [JsonPropertyName("activePK")] public string ActivePK { get; set; }

        public override string ToString()
        {
            return $"{{IsConnected:{IsConnected}, IsUnlocked:{IsUnlocked}, ActivePK:{ActivePK}}}";
        }
    }
}
