﻿using System;
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
                
                var approval = new DeployApproval()
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
