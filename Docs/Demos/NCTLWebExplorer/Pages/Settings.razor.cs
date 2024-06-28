
using Microsoft.AspNetCore.Components;
using NCTLWebExplorer.Services;

namespace NCTLWebExplorer.Pages;

public partial class Settings
{
    [Inject] protected EventStore EventStore { get; set; }

    private async Task ConnectEventStoreListener()
    {
        EventStore.StartListening();
        StateHasChanged();
    }
    
    private async Task DisconnectEventStoreListener()
    {
        await EventStore.StopListenning();
        StateHasChanged();
    }

    private void SwitchToCondorListener()
    {
        EventStore.SwitchToNodeVersion2();
    }
}
