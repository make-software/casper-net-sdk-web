using System;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Casper.Network.SDK.Types;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop;

namespace Casper.Network.SDK.Web
{
    /// <summary>
    /// Delegate to receive signer state update events.
    /// </summary>
    public delegate void SignerStateUpdateEventHandler(bool isConnected, bool isUnlocked, string activePublicKey);

    /// <summary>
    /// Service class to interact with Signer extension in the browser.
    /// </summary>
    public class CasperSignerInterop : IAsyncDisposable
    {
        private readonly ILogger<CasperSignerInterop> _logger;

        private readonly Lazy<Task<IJSObjectReference>> _moduleTask;

        public event SignerStateUpdateEventHandler OnStateUpdate;

        public CasperSignerInterop(IJSRuntime jsRuntime, ILogger<CasperSignerInterop> logger)
        {
            _logger = logger;
            
            _moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/Casper.Network.SDK.Web/casperSignerInterop.js").AsTask());
        }

        private async Task _callSignerInterop(string method, params object[] par)
        {
            var module = await _moduleTask.Value;
            await module.InvokeVoidAsync(method, par);
        }

        private async Task<T> _callSignerInterop<T>(string method, params object[] par)
        {
            var module = await _moduleTask.Value;
            return await module.InvokeAsync<T>(method, par);
        }

        /// <summary>
        /// Returns true if the signer extension is installed in the browser.
        /// </summary>
        public async Task<bool> IsSignerPresent()
        {
            var module = await _moduleTask.Value;
            return await module.InvokeAsync<bool>("isCasperSignerExtensionPresent");
        }

        /// <summary>
        /// Call this method once to subscribe to the signer extension events. Add a delegate method
        /// to `OnStateUpdate` to receive callbacks every time an event is triggered.
        /// </summary>
        public async Task AddEventListeners() =>
            await _callSignerInterop("addEventListeners",
                DotNetObjectReference.Create<CasperSignerInterop>(this));

        /// <summary>
        /// Method called by javascript to send a signer state update. Should not be called
        /// by the user.
        /// </summary>
        [JSInvokable("UpdateState")]
        public void UpdateState(bool isConnected, bool isUnlocked, string activePublicKey)
        {
            _logger.LogDebug("Updated state: " +
                $"{{IsConnected:{isConnected}, IsUnlocked:{isUnlocked}, ActivePK:{activePublicKey}}}");
            OnStateUpdate?.Invoke(isConnected, isUnlocked, activePublicKey);
        }

        /// <summary>
        /// Gets a string with the version of the signer extension installed.
        /// </summary>
        public async Task<string> GetVersion() =>
            await _callSignerInterop<string>("getVersion");

        /// <summary>
        /// Gets the current state of the signer extension.
        /// </summary>
        public async Task<SignerState> GetState() =>
            await _callSignerInterop<SignerState>("getCasperSignerState");

        /// <summary>
        /// Returns true if the site is connected to the signer extension. The user must grant
        /// the connection to the site to access the signing functionalities.
        /// </summary>
        public async Task<bool> IsConnected() =>
            await _callSignerInterop<bool>("isConnected");

        /// <summary>
        /// Request the user to grant a connection between the current site and the signer
        /// extension. This step is required to access the signing functionalities.
        /// </summary>
        public async Task RequestConnection() =>
            await _callSignerInterop("requestConnection");

        /// <summary>
        /// Disconnects the site from the signer extension.
        /// </summary>
        public async Task DisconnectFromSite() =>
            await _callSignerInterop("disconnectFromSite");

        /// <summary>
        /// Gets the selected (or active) public key.
        /// </summary>
        public async Task<string> GetActivePublicKey() =>
            await _callSignerInterop<string>("getActivePublicKey");

        /// <summary>
        /// Sends a deploy to the signer to request the user to sign it.
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
                var signerResult = await _callSignerInterop<JsonElement>("sign", json, srcPk, tgtPk);

                var approval = new DeployApproval()
                {
                    Signer =
                        PublicKey.FromHexString(signerResult.EnumerateArray().First().GetProperty("signer").ToString()),
                    Signature = Signature.FromHexString(
                        signerResult.EnumerateArray().First().GetProperty("signature").ToString())
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
        public async Task<string> SignMessage(string message, string signingPublicKey) =>
            await _callSignerInterop<string>("signMessage", message, signingPublicKey);

        public async ValueTask DisposeAsync()
        {
            if (_moduleTask.IsValueCreated)
            {
                var module = await _moduleTask.Value;
                await module.DisposeAsync();
            }
        }
    }

    public class SignerState
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
