using NCTLWebExplorer.Components;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;

namespace NCTLWebExplorer.Pages;

public partial class BlockDetail
{
    [Parameter] public string BlockHash { get; set; }
    
    [Inject] protected NavigationManager NavigationManager { get; set; }

    private RpcJsonViewer JsonViewerInstance { get; set; }

    private bool _blockChanged;
    private string _blockJson;
    private Block _block;
    
    protected override async Task OnInitializedAsync()
    {
        if (CasperRpcService != null && 
            !string.IsNullOrWhiteSpace(BlockHash))
        {
            var response = await CasperRpcService.GetBlock(BlockHash);
            _blockJson = response.Result.GetRawText();
            var blockResult = response.Parse();
            _block = blockResult.Block;
        }
        
        NavigationManager.LocationChanged += LocationChanged;
        await base.OnInitializedAsync();
    }
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            JsonViewerInstance?.Render(_blockJson);
            _blockChanged = false;
        }
        else if (_blockChanged)
        {
            await GetBlock();
            JsonViewerInstance?.Render(_blockJson);
            _blockChanged = false;
            StateHasChanged();
        }
    }

    private void LocationChanged(object sender, LocationChangedEventArgs e)
    {
        if (_block.Hash != BlockHash)
            _blockChanged = true;
    }

    private async Task GetBlock()
    {
        if (CasperRpcService != null && 
            !string.IsNullOrWhiteSpace(BlockHash))
        {
            var response = await CasperRpcService.GetBlock(BlockHash);
            _blockJson = response.Result.GetRawText();
            var blockResult = response.Parse();
            _block = blockResult.Block;
        }
    }
}
