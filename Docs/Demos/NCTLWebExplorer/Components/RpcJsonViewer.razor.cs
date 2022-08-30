using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace NCTLWebExplorer.Components;

public partial class RpcJsonViewer
{
    [Parameter] public string Json { get; set; }
    [Parameter] public string FilterPath { get; set; }

    async Task OnShowJsonClick()
    {
        await this.Render(Json);
    }

    [Inject] protected IJSRuntime JsRuntime { get; set; }

    protected string ID { get; }

    public RpcJsonViewer()
    {
        ID = Guid.NewGuid().ToString().Replace("-", "");
    }

    public async ValueTask Render(string Json)
    {
        var result = Regex.Replace(Json, 
            "\"merkle_proof\":*\"[^\"]+\"", $"\"merkle_proof\":\"skipped\"");
        result = Regex.Replace(result, 
            "\"module_bytes\":*\"[^\"]+\"", $"\"module_bytes\":\"skipped\"");
        
        await JsRuntime.InvokeVoidAsync("Texnomic.Blazor.JsonViewer.SetData", ID, result);
    }
    
    public ValueTask Collapse(string filter)
    {
        return JsRuntime.InvokeVoidAsync("Texnomic.Blazor.JsonViewer.Collapse", ID, filter);
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