var casperWalletState = { isConnected:false, isUnlocked:false, activePK:'' }

function setCasperWalletState(_connected, _unlocked, _activePk) {    
    casperWalletState = { isConnected:_connected, isUnlocked: _unlocked, activePK: _activePk };
}

export function isCasperWalletExtensionPresent() {
    try {
        return !(typeof CasperWalletProvider() === 'undefined');
    } catch(err) {
        return false;
    }
}

const errorWalletNotPresent = 'Casper Wallet Extension not found. Make sure you have the extension installed and refresh the page before trying again.';

export function getCasperWalletState() {
    return {
        "isConnected": casperWalletState.isConnected,
        "isUnlocked": casperWalletState.isUnlocked,
        "activePK": casperWalletState.activePK
    };
}

var dotNetWalletInstance;

function walletEventHandler(evtName, evtDetail) {
    setCasperWalletState(evtDetail.isConnected || false,
        !evtDetail.isLocked || false, evtDetail.activeKey || '');

    if (typeof dotNetWalletInstance !== 'undefined')
        dotNetWalletInstance.invokeMethodAsync('UpdateState',
            evtDetail.isConnected || false, !evtDetail.isLocked || false, evtDetail.activeKey || '', evtName);
}

export function addEventListeners(instance) {

    dotNetWalletInstance = instance;

    window.addEventListener(CasperWalletEventTypes.Connected, msg => {
        walletEventHandler(CasperWalletEventTypes.Connected, JSON.parse(msg.detail));
    });
    window.addEventListener(CasperWalletEventTypes.Disconnected, msg => {
        walletEventHandler(CasperWalletEventTypes.Disconnected, {...JSON.parse(msg.detail), activeKey:''});
    });
    window.addEventListener(CasperWalletEventTypes.ActiveKeyChanged, msg => {
        walletEventHandler(CasperWalletEventTypes.ActiveKeyChanged, JSON.parse(msg.detail));
    });
    window.addEventListener(CasperWalletEventTypes.Locked, msg => {
        walletEventHandler(CasperWalletEventTypes.Locked, {...JSON.parse(msg.detail), activeKey:''});
    });
    window.addEventListener(CasperWalletEventTypes.Unlocked, msg => {
        walletEventHandler(CasperWalletEventTypes.Unlocked, JSON.parse(msg.detail));
    });
    window.addEventListener(CasperWalletEventTypes.TabChanged, msg => {
        walletEventHandler(CasperWalletEventTypes.TabChanged, JSON.parse(msg.detail));
    })
}

export async function getVersion() {
    if (isCasperWalletExtensionPresent()) {
        try {
            return await CasperWalletProvider().getVersion();
        } catch {
            return '<1.0.0';
        }
    }

    return Promise.reject(new Error(errorWalletNotPresent));
}

export async function isConnected() {
    if (isCasperWalletExtensionPresent())
        return CasperWalletProvider().isConnected().then(r => r).catch(r => false);

    return Promise.reject(new Error(errorWalletNotPresent));
}

export async function requestConnection() {
    if (isCasperWalletExtensionPresent())
    {
        var isConnected = await CasperWalletProvider().isConnected();
        var activePk = await CasperWalletProvider().getActivePublicKey().then(k => k).catch(err => null);
        if(isConnected && activePk !== null)
        {
            walletEventHandler(CasperWalletEventTypes.Unlocked, { isConnected: true, isLocked: false, activeKey: activePk });
            return;
        }
        await CasperWalletProvider().requestConnection();
        return;
    }
    throw new Error(errorWalletNotPresent);
}

export async function disconnectFromSite() {
    if (isCasperWalletExtensionPresent())
        return CasperWalletProvider().disconnectFromSite();
    throw new Error(errorWalletNotPresent);
}

export async function switchAccount() {
    if (isCasperWalletExtensionPresent())
        return CasperWalletProvider().requestSwitchAccount();
    throw new Error(errorWalletNotPresent);
}

export async function getActivePublicKey() {
    if (isCasperWalletExtensionPresent())
        return CasperWalletProvider().getActivePublicKey().then(k => k).catch(err => null);

    return Promise.reject(new Error(errorWalletNotPresent));
}

export async function sign(deploystr,
                           sourcePublicKey,
                           targetPublicKey) {
    if (isCasperWalletExtensionPresent()) {
        var result = await CasperWalletProvider().sign(
            "{\"deploy\": " + deploystr + "}",
            sourcePublicKey,
            targetPublicKey
        );
        if(result.cancelled === true)
            return '';
        
        return sourcePublicKey.slice(0,2) + result.signatureHex;
    }

    return Promise.reject(new Error(errorWalletNotPresent));
}

export async function signMessage(message, signingPublicKey) {
    if (isCasperWalletExtensionPresent()) {
        var result = await CasperWalletProvider().signMessage(
            message, signingPublicKey
        );
        if(result.cancelled === true)
            return '';
        
        return result.signatureHex;
    }

    return Promise.reject(new Error(errorWalletNotPresent));
}
