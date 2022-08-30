// This is a JavaScript module that is loaded on demand. It can export any number of
// functions, and may import other JavaScript modules if required.

export function isCasperSignerExtensionPresent() {
    return !(typeof window.casperlabsHelper === 'undefined');
}

const errorSignerNotPresent = 'Casper Signer Extension not found. Make sure you have the extension installed and refresh the page before trying again.';

export function getCasperSignerState() {
    return {
        "isConnected": csState.isConnected,
        "isUnlocked": csState.isUnlocked,
        "activePK": csState.activePK
    };
}

var dotNetSignerInstance;

function signerEventHandler(evtDetail) {
    setCSState(evtDetail.isConnected || false,
        evtDetail.isUnlocked, evtDetail.activeKey || '');

    if (typeof dotNetSignerInstance !== 'undefined')
        dotNetSignerInstance.invokeMethodAsync('UpdateState',
            evtDetail.isConnected || false, evtDetail.isUnlocked, evtDetail.activeKey || '');
}

export function addEventListeners(instance) {

    dotNetSignerInstance = instance;

    window.addEventListener('signer:connected', msg => {
        signerEventHandler(msg.detail);
    });
    window.addEventListener('signer:disconnected', msg => {
        signerEventHandler({...msg.detail, activeKey:''});
    });
    window.addEventListener('signer:tabUpdated', msg => {
        signerEventHandler(msg.detail);
    });
    window.addEventListener('signer:activeKeyChanged', msg => {
        signerEventHandler(msg.detail);
    });
    window.addEventListener('signer:locked', msg => {
        signerEventHandler({...msg.detail, activeKey:''});
    });
    window.addEventListener('signer:unlocked', msg => {
        signerEventHandler(msg.detail);
    });
}

export async function getVersion() {
    if (isCasperSignerExtensionPresent()) {
        try {
            return await window.casperlabsHelper.getVersion();
        } catch {
            return '<1.0.0';
        }
    }

    return Promise.reject(new Error(errorSignerNotPresent));
}

export async function isConnected() {
    if (isCasperSignerExtensionPresent())
        return await window.casperlabsHelper.isConnected();

    return Promise.reject(new Error(errorSignerNotPresent));
}

export async function requestConnection() {
    if (isCasperSignerExtensionPresent())
        return window.casperlabsHelper.requestConnection();
    throw new Error(errorSignerNotPresent);
}

export async function disconnectFromSite() {
    if (isCasperSignerExtensionPresent())
        return window.casperlabsHelper.disconnectFromSite();
    throw new Error(errorSignerNotPresent);
}

export async function getActivePublicKey() {
    if (isCasperSignerExtensionPresent())
        return window.casperlabsHelper.getActivePublicKey();

    return Promise.reject(new Error(errorSignerNotPresent));
}

export async function sign(deploystr,
                           sourcePublicKey,
                           targetPublicKey) {
    if (isCasperSignerExtensionPresent()) {
        var signedDeploy = await window.casperlabsHelper.sign(
            {deploy: JSON.parse(deploystr)},
            sourcePublicKey,
            targetPublicKey
        );
        return signedDeploy.deploy.approvals;
    }

    return Promise.reject(new Error(errorSignerNotPresent));
}

export async function signMessage(message, signingPublicKey) {
    if (isCasperSignerExtensionPresent())
        return window.casperlabsHelper.signMessage(message, signingPublicKey);

    return Promise.reject(new Error(errorSignerNotPresent));
}
