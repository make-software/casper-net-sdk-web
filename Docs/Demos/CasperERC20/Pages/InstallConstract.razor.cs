using System.Numerics;
using Casper.Network.SDK.Clients;
using Casper.Network.SDK.Types;
using CasperERC20.Components;
using Microsoft.AspNetCore.Components;

namespace CasperERC20.Pages;

public partial class InstallConstract
{
    // erc20 contract details
    //
    private string _name;
    private string _symbol;
    private string _decimals;
    private string _totalSupply;

    private bool IsTokenDataComplete() => _name != null
                                          && _symbol != null
                                          && _decimals != null
                                          && _totalSupply != null;

    // account signer will be the owner of the contract
    //
    private string _ownerPK;
    
    // deploy hash for the contract installation
    //
    private string _deployHash;

    private string _contractHash;
    
    private CasperClientError _signDeployError;
    private CasperClientError _getDeployError;

    [Inject] private NavigationManager NavigationManager { get; set; }

    [Inject] private IERC20Client ERC20ClientWeb { get; set; }
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        var state = await SignerInterop.GetState();
        if (state.IsUnlocked)
            _ownerPK = state.ActivePK;
        
        if (firstRender)
        {
            SignerInterop.OnStateUpdate += (connected, unlocked, key) =>
            {
                _ownerPK = unlocked ? key : null;
                StateHasChanged();
            };
        }
    }

    private int _stepsIndex = 0;
        
    void OnGoToSignDeployClick()
    {
        _stepsIndex = 1;
        StateHasChanged();
    }
    
    async Task OnDeployClick()
    {
        _signDeployError.Hide();
        
        try
        {
            var bytes = File.ReadAllBytes("erc20_token.wasm");
        
            var state = await SignerInterop.GetState();

            var deployHelper = ERC20ClientWeb.InstallContract(bytes, _name, _symbol, 
                byte.Parse(_decimals), BigInteger.Parse(_totalSupply),
                PublicKey.FromHexString(state.ActivePK), 250_000_000_000);
        
            var signed = await SignerInterop.RequestSignature(deployHelper.Deploy, state.ActivePK, state.ActivePK);
            if (signed)
            {
                _deployHash = deployHelper.Deploy.Hash;

                _stepsIndex = 2;
                StateHasChanged();

                try
                {
                    await deployHelper.PutDeploy();
                    _getDeployError.ShowWarning("Waiting for deploy execution results (" + deployHelper.Deploy.Hash +
                                                ")");

                    await deployHelper.WaitDeployProcess();

                    if (deployHelper.IsSuccess)
                    {
                        _getDeployError.Hide();
                        _contractHash = deployHelper.ContractHash.ToString();
                        await LocalStorage.SetItemAsStringAsync($"contract-{_symbol}", _contractHash);
                    }
                    else
                        _getDeployError.ShowError("Deploy executed with error. " +
                                                  deployHelper.ExecutionResult.ErrorMessage);
                }
                catch (Exception e)
                {
                    _getDeployError.ShowError("Error in deploy.", e);
                }
            }
            else
                _signDeployError.ShowError("Deploy not signed.");
        }
        catch (Exception e)
        {
            _getDeployError.ShowError("Error", e);
        }
        
        await InvokeAsync(StateHasChanged);
    }
}
