using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace NCTLWebExplorer.Components;

public partial class RpcJsonViewer
{
    private string _originalJson;
    private string _jsonToRender;

    [Parameter]
    public string Json
    {
        get { return _originalJson; }
        set { 
            _originalJson = value;
            _jsonToRender = this.PrepareJson(value);
        }
    }
    
    [Parameter] public string FilterPath { get; set; }

    private string PrepareJson(string json)
    {
        var result = Regex.Replace(json, 
            "\"merkle_proof\":*\"[^\"]+\"", $"\"merkle_proof\":\"skipped\"");
        result = Regex.Replace(result, 
            "\"module_bytes\":*\"[^\"]+\"", $"\"module_bytes\":\"skipped\"");
        
        return result;
    }
    
    async Task OnShowJsonClick()
    {
        await this.Render(_originalJson);
    }

    [Inject] protected IJSRuntime JsRuntime { get; set; }

    protected string ID { get; }

    public RpcJsonViewer()
    {
        ID = Guid.NewGuid().ToString().Replace("-", "");
    }

    public async ValueTask Render(string json)
    {
        if (string.IsNullOrWhiteSpace(json))
            return;
        
        _originalJson = json;
        _jsonToRender = this.PrepareJson(json);
        
        await JsRuntime.InvokeVoidAsync("Texnomic.Blazor.JsonViewer.SetData", ID, _jsonToRender);
    }
    
    public ValueTask Collapse(string filter)
    {
        return JsRuntime.InvokeVoidAsync("Texnomic.Blazor.JsonViewer.Collapse", ID, filter);
    }

    public ValueTask CopyToClipboard()
    {
        if (string.IsNullOrWhiteSpace(_originalJson))
            return ValueTask.CompletedTask;
        
        return JsRuntime.InvokeVoidAsync("copyToClipboard", _originalJson);
    }
    
    public ValueTask Expand(string filter)
    {
        return JsRuntime.InvokeVoidAsync("Texnomic.Blazor.JsonViewer.Expand", ID, filter);
    }

    public ValueTask Filter(string filter)
    {
        return JsRuntime.InvokeVoidAsync("Texnomic.Blazor.JsonViewer.Filter", ID, filter);
    }
}