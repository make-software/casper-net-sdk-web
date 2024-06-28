using System;
using System.Threading.Tasks;
using Casper.Network.SDK.ByteSerializers;
using Casper.Network.SDK.Types;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop;

namespace Casper.Network.SDK.Web
{
    /// <summary>
    /// Delegate to receive Ledger state update events.
    /// </summary>
    public delegate void LedgerStateUpdateEventHandler(bool isUnlocked, string activePublicKey);

    /// <summary>
    /// Service class to interact with Ledger from a web app.
    /// </summary>
    public class CasperLedgerInterop
    {
        private readonly ILogger<CasperLedgerInterop> _logger;

        private readonly IJSRuntime _jsRuntime;
        
        public event LedgerStateUpdateEventHandler OnStateUpdate;

        private int _selectedAccountIdx;
        
        public string ActivePK { get; set; }
        
        public CasperLedgerInterop(IJSRuntime jsRuntime, ILogger<CasperLedgerInterop> logger)
        {
            _logger = logger;
            _jsRuntime = jsRuntime;
        }

        private async Task _callLedgerInterop(string method, params object[] par)
        {
            await _jsRuntime.InvokeVoidAsync(method, par);
        }

        private async Task<T> _callLedgerInterop<T>(string method, params object[] par)
        {
            return await _jsRuntime.InvokeAsync<T>(method, par);
        }
        
        [JSInvokable("UpdateState")]
        public void UpdateState(bool isUnlocked, string activePublicKey)
        {
            _logger.LogDebug("Ledger updated state: " +
                             $"{{IsUnlocked:{isUnlocked}, ActivePK:{activePublicKey}}}");

            ActivePK = activePublicKey;
            OnStateUpdate?.Invoke(isUnlocked, activePublicKey);
        }
        
        /// <summary>
        /// Requests a connection to the Ledger device and starts listening to events.
        /// </summary>
        /// <param name="acctIdx">Initial selected account.</param>
        public async Task Connect(int acctIdx=0)
        {
            try
            {
                await _callLedgerInterop("ledgerInterop.addEventListeners",
                    DotNetObjectReference.Create(this));
                
                var activePK = await _callLedgerInterop<string>("ledgerInterop.connect", acctIdx);
                
                _logger.LogDebug("Ledger device connected.");
                _selectedAccountIdx = acctIdx;
                ActivePK = activePK;
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
                throw;
            }
        }

        /// <summary>
        /// Disconnects from the Ledger device.
        /// </summary>
        public async Task Disconnect()
        {
            try
            {
                await _callLedgerInterop("ledgerInterop.disconnect");
            
                _logger.LogDebug("Ledger device disconnected.");
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
                throw;
            }
        }

        /// <summary>
        /// Gets the Casper App version installed in the Ledger device.
        /// </summary>
        public async Task<CasperAppVersion> GetCasperAppVersion()
        {
            try
            {
                var casperAppVersion = await _callLedgerInterop<CasperAppVersion>("ledgerInterop.getVersion");

                return casperAppVersion;
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
                throw;
            }
        }

        /// <summary>
        /// Gets information from the app running in the foreground of the Ledger device.
        /// </summary>
        public async Task<AppInfo> GetAppInfo()
        {
            try
            {
                var appInfo = await _callLedgerInterop<AppInfo>("ledgerInterop.getAppInfo");

                return appInfo;
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
                throw;
            }
        }
        
        /// <summary>
        /// Selects an account based on an index starting with 0.
        /// </summary>
        /// <param name="acctIdx">Index of the new selected account.</param>
        public async Task SelectAccount(int acctIdx)
        {
            try
            {
                ActivePK = await _callLedgerInterop<string>("ledgerInterop.getAccount", acctIdx);
                _selectedAccountIdx = acctIdx;
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
                throw;
            }
        }

        /// <summary>
        /// Requests to the Ledger device to show account information on the device screen.
        /// The indicated account becomes the new selected account.
        /// </summary>
        /// <param name="acctIdx">Index of the new selected account.</param>
        public async Task ShowAccount(int acctIdx)
        {
            try
            {
                var pk = await _callLedgerInterop<string>("ledgerInterop.showAccount", acctIdx);
                ActivePK = pk ?? "";
                _selectedAccountIdx = pk != null ? acctIdx : -1;
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
                throw;
            }
        }

        /// <summary>
        /// Requests the signature of a Deploy with the selected account.
        /// </summary>
        /// <param name="deploy">Deploy to be signed.</param>
        /// <returns>True if the deploy has been signed and an approval added to it. False otherwise.</returns>
        /// <exception cref="Exception">Returns an exception in case of rejection of the signature. Or if the Deploy is not supported
        /// by the current Ledger app.</exception>
        public async Task<bool> RequestSignature(Deploy deploy)
        {
            try
            {
                var serializer = new DeployByteSerializer();
                var bytes = serializer.ToBytes(deploy);

                var signature = await _callLedgerInterop<string>("ledgerInterop.sign",
                    _selectedAccountIdx, bytes);

                if (signature == null)
                    throw new Exception("User rejected the signature request.");

                if (signature.Length > 130) // remove V byte if included
                    signature = signature[..130];
                
                var approval = new Approval()
                {
                    Signer =  PublicKey.FromHexString(ActivePK),
                    Signature = Signature.FromHexString(signature)
                };
                deploy.Approvals.Add(approval);

                return true;
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
                throw;
            }
        }
        
        public class CasperAppVersion
        {
            public bool TestMode { get; init; }
            public uint Major { get; init; }
            public uint Minor { get; init; }
            public uint Patch { get; init; }
            public bool DeviceLocked { get; init; }
            public string TargetId { get; init; }
        }

        public class AppInfo
        {
            public string AppName { get; init; }
            public string AppVersion { get; init; }
            public int FlagLen { get; init; }
            public int FlagsValue { get; init; }
            public bool FlagRecovery { get; init; }
            public bool FlagSignedMcuCode { get; init; }
            public bool FlagOnboarded { get; init; }
            public bool FlagPINValidated { get; init; }
        }
    }
}
