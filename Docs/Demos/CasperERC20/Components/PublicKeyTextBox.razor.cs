using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Radzen;

namespace CasperERC20.Components;

public partial class PublicKeyTextBox : FormComponent<string>
{
    private bool _getKeyBtnVisible = true;
    private bool _linkedToSigner = false;
    
    [Parameter] public string Text { get; set; }
    
    [Parameter] public CasperSignerInterop SignerRef { get; set; }

    [Parameter] public bool LinkedToSigner { get; set; }

    protected override void OnInitialized()
    {
        _getKeyBtnVisible = SignerRef != null;
        _linkedToSigner = _getKeyBtnVisible && LinkedToSigner;
    }
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        var updateState = async (bool connected, bool unlocked, string activePK) =>
        {
            var oldValue = Value;
            if (!connected || !unlocked)
                Value = string.Empty;
            else if (!string.IsNullOrEmpty(activePK))
                Value = activePK;
            
            if(Value!=oldValue)
                await ValueChanged.InvokeAsync(Value);
        };
        
        if (firstRender && _linkedToSigner)
        {
            var state = await SignerRef.GetState();
            await updateState(state.IsConnected, state.IsUnlocked, state.ActivePK);

            SignerRef.OnStateUpdate += async (connected, unlocked, key) =>
                await updateState(connected, unlocked, key);
        }
    }
    
    private async Task OnChange(string value)
    {
        Value = value;
        await ValueChanged.InvokeAsync(Value);
    }

    private async Task GetKeyFromSigner()
    {
        if (SignerRef != null)
        {
            var state = await SignerRef.GetState();
            if (state.IsUnlocked && !string.IsNullOrEmpty(state.ActivePK) &&
                Value != state.ActivePK)
            {
                Value = state.ActivePK;
                await ValueChanged.InvokeAsync(state.ActivePK);
            }
        }
    }
    
    protected override string GetComponentCssClass()
    {
        return GetClassList("rz-publickeytextbox").ToString();
    }
}