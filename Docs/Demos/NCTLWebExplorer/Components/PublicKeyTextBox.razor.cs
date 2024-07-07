using Casper.Network.SDK.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Radzen;

namespace NCTLWebExplorer.Components;

public partial class PublicKeyTextBox : FormComponent<string>
{
    private bool _getKeyBtnVisible = true;
    private bool _linkedToSigner = false;
    
    [Parameter] public string Text { get; set; }
    
    [Parameter] public bool LinkedToSigner { get; set; }

    protected override void OnInitialized()
    {
        _getKeyBtnVisible = false;
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
    }
    
    private async Task OnChange(string value)
    {
        Value = value;
        await ValueChanged.InvokeAsync(Value);
    }

    private async Task GetKeyFromSigner()
    {
    }
    
    protected override string GetComponentCssClass()
    {
        return GetClassList("rz-publickeytextbox").ToString();
    }
}
