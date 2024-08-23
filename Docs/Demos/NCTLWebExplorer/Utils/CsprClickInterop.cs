using Casper.Network.SDK.Types;
using Casper.Network.SDK.Web;
using Microsoft.JSInterop;

namespace NCTLWebExplorer.Utils;

public delegate void CsprClickEventHandler(string eventType, string activePublicKey);

public class CsprClickInterop
{
    private readonly ILogger<CsprClickInterop> _logger;

    private readonly IJSRuntime _jsRuntime;

    public event CsprClickEventHandler OnStateUpdate;

    public string ActivePK { get; set; }

    public CsprClickInterop(IJSRuntime jsRuntime, ILogger<CsprClickInterop> logger)
    {
        _jsRuntime = jsRuntime;
        _logger = logger;
    }

    private async Task _callCsprClickInterop(string method, params object[] par)
    {
        await _jsRuntime.InvokeVoidAsync(method, par);
    }

    private async Task<T> _callCsprClickInterop<T>(string method, params object[] par)
    {
        return await _jsRuntime.InvokeAsync<T>(method, par);
    }

    public async Task SetDotNetInstance()
    {
        await _callCsprClickInterop("setDotNetInstance",
            DotNetObjectReference.Create<CsprClickInterop>(this));
    }

    public async Task<string> GetActiveKey()
    {
        Console.WriteLine("GetActiveKey");
        var key = await _callCsprClickInterop<string>("csprclickGetActiveKey");
        Console.WriteLine("GetActiveKey 2");

        return key;
    }

    public async Task<Deploy> SignDeploy(Deploy deploy, string signingKey)
    {
        var json = deploy.SerializeToJson();
        var signature = await _callCsprClickInterop<string>("csprclickSignDeploy",
            json, signingKey);
        if (signature != null)
        {
            deploy.AddApproval(new Approval()
            {
                Signer = PublicKey.FromHexString(signingKey),
                Signature = Signature.FromHexString(signature),
            });
            return deploy;
        }

        return null;
    }
    
    [JSInvokable("UpdateState")]
    public void UpdateState(string eventType, string activePublicKey)
    {
        _logger.LogDebug("CSPR.click updated state: " +
                         $"ActivePK:{activePublicKey}");

        ActivePK = activePublicKey;
        OnStateUpdate?.Invoke(eventType, activePublicKey);
    }
}