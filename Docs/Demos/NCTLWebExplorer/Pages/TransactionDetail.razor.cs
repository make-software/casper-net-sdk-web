using System.Runtime.InteropServices;
using NCTLWebExplorer.Components;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.DependencyInjection;

namespace NCTLWebExplorer.Pages;

public partial class TransactionDetail
{
    [Inject]
    private ILogger<DeployDetail> Logger { get; set; }

    [Parameter]
    public string TransactionV1Hash { get; set; }

    private RpcJsonViewer JsonViewerInstance { get; set; }

    private string _transactionJson;
    private TransactionV1 _transaction;
    private string _blockHash;
    private ExecutionResult _executionResult;
    
    protected override async Task OnInitializedAsync()
    {
        if (!string.IsNullOrWhiteSpace(TransactionV1Hash))
        {
            try
            {
                Console.WriteLine("Requesting transaction: " + TransactionV1Hash);
                var response = await CasperRpcService.GetTransaction(new TransactionHash() { Version1 = TransactionV1Hash });
                _transactionJson = response.Result.GetRawText();
                var transactionResult = response.Parse();
                _transaction = transactionResult.Transaction.TransactionV1;
                _blockHash = transactionResult.ExecutionInfo.BlockHash;
                _executionResult = transactionResult.ExecutionInfo.ExecutionResult;
                StateHasChanged();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
        }
    }
    
    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender || _transactionJson != null)
        {
            JsonViewerInstance?.Render(_transactionJson);
            _transactionJson = null;
        }
    }
}