using System.Globalization;
using System.Text.Json;
using Casper.Network.SDK.JsonRpc;
using NCTLWebExplorer.Components;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using NCTLWebExplorer.Models;
using NCTLWebExplorer.Services;

namespace NCTLWebExplorer.Pages;

public partial class TransactionDetail
{
    [Inject]
    private ILogger<DeployDetail> Logger { get; set; }

    [Parameter]
    public string TransactionV1Hash { get; set; }

    [Inject] protected EventListener EventListener { get; set; }

    private RpcJsonViewer JsonViewerInstance { get; set; }

    private string _transactionJson;
    private TransactionV1 _transaction;
    private string _blockHash;
    private ExecutionResult _executionResult;
    private List<MessageSummary> _messages = new();
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
            catch (RpcClientException e)
            {
                ErrorMessage = e.Message + ".\n" + e.Data;
            }
            catch (Exception e)
            {
                ErrorMessage = e.Message;
            }

            try
            {
                var tx = await EventListener.GetTransactionByHash(TransactionV1Hash);
                if (tx != null && !string.IsNullOrWhiteSpace(tx.Messages))
                    _messages = JsonSerializer.Deserialize<List<MessageSummary>>(tx.Messages);
            }
            catch 
            {
                // ignored
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
    
    private string TimestampToLocalTime(ulong timestamp)
    {
        try
        {
            var isoDateTime = Casper.Network.SDK.Utils.DateUtils.ToISOString(_transaction.Header.Timestamp);
            if(DateTime.TryParse(isoDateTime, out var t))
                return t.ToLocalTime().ToString("", CultureInfo.CurrentCulture);
        }
        catch 
        {
        }
        return timestamp.ToString();
    }
}