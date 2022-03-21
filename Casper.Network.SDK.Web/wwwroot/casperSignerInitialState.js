var csState = { isConnected:false, isUnlocked:false, activePK:'' }

function setCSState(_connected, _unlocked, _activePk) {
    csState = { isConnected:_connected, isUnlocked: _unlocked, activePK: _activePk };
}

window.addEventListener('signer:initialState', msg => {
    setCSState(msg.detail.isConnected||false, msg.detail.isUnlocked, msg.detail.activeKey||'');
    if (typeof dotNetSignerInstance !=='undefined')
        dotNetSignerInstance.invokeMethodAsync('UpdateState',
            msg.detail.isConnected || false, msg.detail.isUnlocked, msg.detail.activeKey || '');
})
