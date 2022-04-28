import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import LedgerApp from '@zondax/ledger-casper';
import {Buffer} from 'buffer';

const SEC_KEY_PREFIX = '02';

const LedgerAppSingleton = (function () {
    let dotNetLedgerInstance: any;
    let transport: any;
    let ledgerApp: LedgerApp;

    let isConnected: boolean = false;

    function addEventListeners(instance: any) {
        dotNetLedgerInstance = instance;
    }

    async function getVersion() {
        transport = await TransportWebUSB.create();
        ledgerApp = new LedgerApp(transport);
        const response = await ledgerApp.getVersion();
        if (response.returnCode !== 0x9000)
            return Promise.reject(new Error(`Error: ${response.errorMessage} (0x${response.returnCode.toString(16)}).`));

        return response;
    }

    async function getAppInfo() {
        transport = await TransportWebUSB.create();
        ledgerApp = new LedgerApp(transport);
        const response = await ledgerApp.getAppInfo();
        if (response.returnCode !== 0x9000)
            return Promise.reject(new Error(`Error: ${response.errorMessage} (0x${response.returnCode.toString(16)}).`));

        return response;
    }

    async function onDisconnect() {
        console.log("Device disconnected.");

        transport.close();

        if (typeof dotNetLedgerInstance !== 'undefined')
            dotNetLedgerInstance.invokeMethodAsync('UpdateState', false, '');

        isConnected = false;
    }

    const encodePublicKey = (bytes: Uint8Array): string =>
        SEC_KEY_PREFIX + Buffer.from(bytes).toString('hex');

    const getAccountPath = (acctIdx: number) => `m/44'/506'/0'/0/${acctIdx.toString()}`;

    async function connect(acctIdx: number) {
        if (!isConnected) {
            try {
                transport = await TransportWebUSB.create();
                transport.on('disconnect', () => onDisconnect());

                ledgerApp = new LedgerApp(transport);
            } catch (error) {
                console.log(error);
                return Promise.reject(new Error(`Error connecting to a Ledger device: ${error.message}.`));
            }

            const response = await ledgerApp.getAddressAndPubKey(getAccountPath(acctIdx));

            if (response.returnCode !== 0x9000)
                return Promise.reject(new Error(`Error connecting to a Ledger device: ${response.errorMessage} (0x${response.returnCode.toString(16)}).`));

            isConnected = true;

            const activePk = encodePublicKey(response.publicKey);

            if (typeof dotNetLedgerInstance !== 'undefined')
                dotNetLedgerInstance.invokeMethodAsync('UpdateState', true, activePk);

            return activePk;
        } else {
            return await getAccount(acctIdx);
        }
    }

    function disconnect() {
        if (isConnected) {
            transport.close();
            isConnected = false;
            if (typeof dotNetLedgerInstance !== 'undefined')
                dotNetLedgerInstance.invokeMethodAsync('UpdateState', false, '');
        }
    }

    async function getAccount(acctIdx: number) {
        if (isConnected) {
            const response = await ledgerApp.getAddressAndPubKey(getAccountPath(acctIdx));

            if (response.returnCode !== 0x9000)
                return Promise.reject(new Error(`Error: ${response.errorMessage} (0x${response.returnCode.toString(16)}).`));

            const activePk = encodePublicKey(response.publicKey);

            if (typeof dotNetLedgerInstance !== 'undefined')
                dotNetLedgerInstance.invokeMethodAsync('UpdateState', true, activePk);

            return activePk;
        }
        return Promise.reject(new Error(`Not connected.`));
    }

    async function showAccount(acctIdx: number) {
        if (isConnected) {
            const response = await ledgerApp.showAddressAndPubKey(getAccountPath(acctIdx));

            if (response.returnCode === 0x6986)
                return null;

            if (response.returnCode !== 0x9000)
                return Promise.reject(new Error(`Error: ${response.errorMessage} (0x${response.returnCode.toString(16)}).`));

            const activePk = encodePublicKey(response.publicKey);

            if (typeof dotNetLedgerInstance !== 'undefined')
                dotNetLedgerInstance.invokeMethodAsync('UpdateState', true, activePk);

            return activePk;
        }
        return Promise.reject(new Error(`Not connected.`));
    }

    async function sign(acctIdx: number, deployBytes: any) {
        if (isConnected) {
            const ledgerApp = new LedgerApp(transport);

            const response = await ledgerApp.sign(getAccountPath(acctIdx), deployBytes);

            if (response.returnCode === 0x6986)
                return null;

            if (response.returnCode !== 0x9000)
                return Promise.reject(new Error(`Error: ${response.errorMessage} (0x${response.returnCode.toString(16)}).`));

            console.log('sign completed: ' + response);

            return SEC_KEY_PREFIX + response.signatureRS.toString('hex');
        }
        return Promise.reject(new Error(`Not connected.`));
    }

    return {
        addEventListeners,
        connect,
        disconnect,
        getVersion,
        getAppInfo,
        isConnected: () => isConnected,
        getAccount,
        showAccount,
        sign
    };
})();

export const addEventListeners = (ref: any) => LedgerAppSingleton.addEventListeners(ref);
export const getVersion = async () => await LedgerAppSingleton.getVersion();
export const getAppInfo = async () => await LedgerAppSingleton.getAppInfo();
export const connect = async (acctIdx: number) => await LedgerAppSingleton.connect(acctIdx);
export const disconnect = () => LedgerAppSingleton.disconnect();
export const isConnected = () => LedgerAppSingleton.isConnected();
export const getAccount = async (acctIdx: number) => LedgerAppSingleton.getAccount(acctIdx);
export const showAccount = async (acctIdx: number) => LedgerAppSingleton.showAccount(acctIdx);
export const sign = async (acctIdx: number, deployBytes: any) => LedgerAppSingleton.sign(acctIdx, deployBytes);
