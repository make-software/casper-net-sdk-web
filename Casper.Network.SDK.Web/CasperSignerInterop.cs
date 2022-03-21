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
    public delegate void StateUpdateEventHandler(bool isConnected, bool isUnlocked, string activePublicKey);

    public class CasperSignerInterop : IAsyncDisposable
    {
        private readonly ILogger<CasperSignerInterop> _logger;

        private readonly Lazy<Task<IJSObjectReference>> _moduleTask;

        public event StateUpdateEventHandler OnStateUpdate;

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

        public async Task<bool> IsSignerPresent()
        {
            var module = await _moduleTask.Value;
            return await module.InvokeAsync<bool>("isCasperSignerExtensionPresent");
        }

        public async Task AddEventListeners() =>
            await _callSignerInterop("addEventListeners",
                DotNetObjectReference.Create<CasperSignerInterop>(this));

        [JSInvokable("UpdateState")]
        public void UpdateState(bool isConnected, bool isUnlocked, string activePublicKey)
        {
            _logger.LogDebug("Updated state: " +
                $"{{IsConnected:{isConnected}, IsUnlocked:{isUnlocked}, ActivePK:{activePublicKey}}}");
            OnStateUpdate?.Invoke(isConnected, isUnlocked, activePublicKey);
        }

        public async Task<string> GetVersion() =>
            await _callSignerInterop<string>("getVersion");

        public async Task<SignerState> GetState() =>
            await _callSignerInterop<SignerState>("getCasperSignerState");

        public async Task<bool> IsConnected() =>
            await _callSignerInterop<bool>("isConnected");

        public async Task RequestConnection() =>
            await _callSignerInterop("requestConnection");

        public async Task DisconnectFromSite() =>
            await _callSignerInterop("disconnectFromSite");

        public async Task<string> GetActivePublicKey() =>
            await _callSignerInterop<string>("getActivePublicKey");

        public async Task<JsonElement> Sign(string deploy, string srcPK, string tgtPK) =>
            await _callSignerInterop<JsonElement>("sign", deploy, srcPK, tgtPK);

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

        public async Task<bool> RequestSignature(Deploy deploy, string srcPk, string? tgtPk)
        {
            var json = deploy.SerializeToJson();

            try
            {
                var signerResult = await Sign(json, srcPk, tgtPk);

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