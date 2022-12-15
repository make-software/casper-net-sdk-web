var casperWalletState = { isConnected:false, isUnlocked:false, activePK:'' }

function setCasperWalletState(_connected, _unlocked, _activePk) {    
    casperWalletState = { isConnected:_connected, isUnlocked: _unlocked, activePK: _activePk };
    console.log("WALLET.js: Setting new state: "); console.log(casperWalletState);
}

window.addEventListener('signer:initialState', msg => {
    setCasperWalletState(msg.detail.isConnected||false, !msg.detail.isLocked, msg.detail.activeKey||'');
    if (typeof dotNetWalletInstance !=='undefined')
        dotNetWalletInstance.invokeMethodAsync('UpdateState',
            msg.detail.isConnected || false, !msg.detail.isLocked, msg.detail.activeKey || '');
})

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

function signerEventHandler(evtDetail) {
    setCasperWalletState(evtDetail.isConnected || false,
        !evtDetail.isLocked || false, evtDetail.activeKey || '');

    if (typeof dotNetWalletInstance !== 'undefined')
        dotNetWalletInstance.invokeMethodAsync('UpdateState',
            evtDetail.isConnected || false, !evtDetail.isLocked || false, evtDetail.activeKey || '');
}


export function addEventListeners(instance) {

    dotNetWalletInstance = instance;

    window.addEventListener('signer:connected', msg => {
        if(typeof msg.detail === 'string')
            signerEventHandler(JSON.parse(msg.detail));
    });
    window.addEventListener('signer:disconnected', msg => {
        if(typeof msg.detail === 'string')
            signerEventHandler({...JSON.parse(msg.detail), activeKey:''});
    });
    window.addEventListener('signer:activeKeyChanged', msg => {
        if(typeof msg.detail === 'string')
            signerEventHandler(JSON.parse(msg.detail));
    });
    window.addEventListener('signer:locked', msg => {
        if(typeof msg.detail === 'string')
            signerEventHandler({...JSON.parse(msg.detail), activeKey:''});
    });
    window.addEventListener('signer:unlocked', msg => {
        if(typeof msg.detail === 'string')
            signerEventHandler(JSON.parse(msg.detail));
    });
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
        return await CasperWalletProvider().isConnected();

    return Promise.reject(new Error(errorWalletNotPresent));
}

export async function requestConnection() {
    if (isCasperWalletExtensionPresent())
    {
        var isConnected = await CasperWalletProvider().isConnected();
        var activePk = await CasperWalletProvider().getActivePublicKey();
        if(isConnected && activePk !== undefined)
        {
            signerEventHandler({ isConnected: true, isLocked: false, activeKey: activePk });
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
    //
    // TODO: update this method when the extension provides a switch account api
    //
    if (isCasperWalletExtensionPresent())
        return CasperWalletProvider().requestConnection();
    throw new Error(errorWalletNotPresent);
}

export async function getActivePublicKey() {
    if (isCasperWalletExtensionPresent())
        return CasperWalletProvider().getActivePublicKey();

    return Promise.reject(new Error(errorWalletNotPresent));
}

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
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
    if (isCasperWalletExtensionPresent())
        return CasperWalletProvider().signMessage(message, signingPublicKey);

    return Promise.reject(new Error(errorWalletNotPresent));
}
