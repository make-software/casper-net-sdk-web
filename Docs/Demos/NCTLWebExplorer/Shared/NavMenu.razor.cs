using Microsoft.AspNetCore.Components;

namespace NCTLWebExplorer.Shared;

public partial class NavMenu
{
    [Parameter] public string Title { get; set; }

    private bool _collapseNavMenu = true;

    private string NavMenuCssClass => _collapseNavMenu ? "collapse" : null;

    private void ToggleNavMenu()
    {
        _collapseNavMenu = !_collapseNavMenu;
    }
}
