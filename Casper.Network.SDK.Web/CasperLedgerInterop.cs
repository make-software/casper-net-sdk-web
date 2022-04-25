using System;
using System.Threading.Tasks;
using Casper.Network.SDK.ByteSerializers;
using Casper.Network.SDK.Types;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop;

namespace Casper.Network.SDK.Web
{
    public delegate void LedgerStateUpdateEventHandler(bool isUnlocked, string activePublicKey);

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
        
        public async Task Connect(int acctIdx=0)
        {
            try
            {
                await _callLedgerInterop("ledgerInterop.addEventListeners",
                    DotNetObjectReference.Create<CasperLedgerInterop>(this));
                
                var activePK = await _callLedgerInterop<string>("ledgerInterop.connect", acctIdx);
                
                _logger.LogDebug("Ledger device connected.");
                _selectedAccountIdx = acctIdx;
                ActivePK = activePK;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public async Task Disconnect()
        {
            await _callLedgerInterop("ledgerInterop.disconnect");
            
            _logger.LogDebug("Ledger device disconnected.");
        }

        public async Task<CasperAppVersion> GetCasperAppVersion()
        {
            try
            {
                var casperAppVersion = await _callLedgerInterop<CasperAppVersion>("ledgerInterop.getVersion");

                return casperAppVersion;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return null;
        }

        public async Task<AppInfo> GetAppInfo()
        {
            try
            {
                var appInfo = await _callLedgerInterop<AppInfo>("ledgerInterop.getAppInfo");

                return appInfo;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return null;
        }
        
        public async Task SelectAccount(int acctIdx)
        {
            try
            {
                ActivePK = await _callLedgerInterop<string>("ledgerInterop.getAccount", acctIdx);
                _selectedAccountIdx = acctIdx;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task ShowAccount(int acctIdx)
        {
            try
            {
                ActivePK = await _callLedgerInterop<string>("ledgerInterop.showAccount", acctIdx);
                _selectedAccountIdx = acctIdx;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public async Task<bool> RequestSignature(Deploy deploy)
        {
            var serializer = new DeployByteSerializer();
            var bytes = serializer.ToBytes(deploy);

            var signature = await _callLedgerInterop<string>("ledgerInterop.sign",
                _selectedAccountIdx, bytes); 
            
            var approval = new DeployApproval()
            {
                Signer =  Casper.Network.SDK.Types.PublicKey.FromHexString(ActivePK),
                Signature = Signature.FromHexString(signature)
            };
            deploy.Approvals.Add(approval);

            return true;
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
