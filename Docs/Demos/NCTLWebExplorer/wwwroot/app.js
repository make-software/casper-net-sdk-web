
// Set up CSPR.click UI (Top Bar)
//
const uiContainer = 'csprclick-ui';

const defaultTheme = 'light';

const onThemeChanged =  (theme) => {
    const page = document.querySelector('body');
    if (theme === 'dark') page?.classList.add('dark');
    else page?.classList.remove('dark');
    console.log('Theme switched to', theme);
};

const accountMenuItems = [
    'CopyHashMenuItem',
];

const clickUIOptions = {
    uiContainer,
    rootAppElement: '#app',
    show1ClickModal: true,
    showTopBar: true,
    defaultTheme,
    accountMenuItems,
};

const clickSDKOptions = {
    appName: 'DevNet Explorer',
    appId: 'bf1e3953-5513-4a66-a7a8-0b52f644',
    providers: ['casper-wallet', 'ledger', 'casperdash'],
};

window.addEventListener('csprclick:loaded', () => {
    window.csprclick.on('csprclick:signed_in', async (evt) => {
        console.log("csprclick:signed_in", evt);
        csprclickEventHandler("csprclick:signed_in", evt.account.public_key);
    });
    window.csprclick.on('csprclick:switched_account', async (evt) => {
        console.log("csprclick:switched_account", evt);
        csprclickEventHandler("csprclick:switched_account", evt.account.public_key);
    });
    window.csprclick.on('csprclick:signed_out', async (evt) => {
        console.log("csprclick:signed_out", evt);
        csprclickEventHandler("csprclick:signed_out", "");
    });
    window.csprclick.on('csprclick:disconnected', async (evt) => {
        console.log("csprclick:disconnected", evt);
        csprclickEventHandler("csprclick:disconnected", "");
    });
});

var dotNetCsprClickInteropInstance;

function setDotNetInstance(instance) {
    dotNetCsprClickInteropInstance = instance;
}

function csprclickEventHandler(eventType, publicKey) {
    if (typeof dotNetCsprClickInteropInstance !== 'undefined')
        dotNetCsprClickInteropInstance.invokeMethodAsync('UpdateState',
            eventType, publicKey);
}

async function csprclickGetActiveKey() {
    console.log("csprclickGetActiveKey", "1");
    if(window.csprclick === undefined) return "";
    console.log("csprclickGetActiveKey", "2");
    var account = await window.csprclick.getActiveAccount();
    console.log("csprclickGetActiveKey", account);
    return account.public_key;
}

async function csprclickSignDeploy(deploy, signingKey) {
    if(window.csprclick === undefined) return "";
    var result = await window.csprclick.sign(deploy, signingKey);
    if(!result.cancelled && result.signatureHex)
        return result.signatureHex;
    return null;
}