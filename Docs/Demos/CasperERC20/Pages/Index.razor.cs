using Casper.Network.SDK.Clients;
using Microsoft.AspNetCore.Components;

namespace CasperERC20.Pages;

public partial class Index
{
    [Inject] private IServiceProvider ServiceProvider { get; set; }

    [Inject] private NavigationManager NavigationManager { get; set; }

    private record ERC20Item(string Caption, string Hash);

    private IEnumerable<ERC20Item> _erc20Contracts;
    private string _selectedContract;
    private bool _showInputBox;

    private async Task LoadContracts()
    {
        var keys = await LocalStorage.KeysAsync();
        var contracts = new List<ERC20Item>();

        var tasks = new List<Task>();

        foreach (var key in keys)
        {
            if (!key.StartsWith("contract-"))
                continue;

            var contractHash = await LocalStorage.GetItemAsStringAsync(key);

            var erc20Client = ServiceProvider.GetService<IERC20Client>();
            if (erc20Client == null) break;

            erc20Client.SetContractHash(contractHash);
            var task = erc20Client.GetName();
            tasks.Add(task.ContinueWith(prevTask =>
            {
                if (!prevTask.IsFaulted)
                {
                    contracts.Add(new ERC20Item(
                        $"{key.Replace("contract-", "")} (hash-{contractHash[5..9]}..{contractHash[28..32]})",
                        contractHash));
                }
            }));
        }

        _erc20Contracts = contracts;

        await Task.WhenAll(tasks).ContinueWith(t =>
        {
            _showInputBox = _erc20Contracts.Any();
            InvokeAsync(StateHasChanged);
        });
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
            await LoadContracts();
    }

    private void OnViewContractClick(string contractHash)
    {
        if (contractHash == null || !contractHash.StartsWith("hash-"))
            return;

        NavigationManager.NavigateTo($"/contract/{contractHash}");
    }
}
