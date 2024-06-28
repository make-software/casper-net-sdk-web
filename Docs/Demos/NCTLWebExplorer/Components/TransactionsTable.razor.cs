using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Components;
using Radzen;
using Radzen.Blazor;

namespace NCTLWebExplorer.Components;

public partial class TransactionsTable : ComponentBase
{
    private RadzenDataGrid<BlockTransaction> _transactionGrid;

    private int _count;
    private bool _isLoading;

    private  List<BlockTransaction> _transactions = new();

    [Parameter]
    public List<BlockTransaction> Transactions
    {
        get { return _transactions; }
        set
        {

            if (_transactions != value)
            {
                _transactions = value;
                OnTransactionsChanged();
            }
        }
    }

    protected void OnTransactionsChanged()
    {
        _count = _transactions.Count();
    }
    
    private void LoadData(LoadDataArgs args)
    {
        _isLoading = true;
        OnTransactionsChanged();
        _isLoading = false;
    }
}
