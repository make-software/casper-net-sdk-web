using Microsoft.AspNetCore.Components;
using NCTLWebExplorer.Models;
using Radzen;
using Radzen.Blazor;

namespace NCTLWebExplorer.Components;

public partial class MessagesTable : ComponentBase
{
    private RadzenDataGrid<MessageSummary> _messageGrid;

    private int _count;
    private bool _isLoading;

    private  List<MessageSummary> _messages = new();

    [Parameter]
    public List<MessageSummary> Messages
    {
        get { return _messages; }
        set
        {

            if (_messages != value)
            {
                _messages = value;
                OnMessagessChanged();
            }
        }
    }

    protected void OnMessagessChanged()
    {
        _count = _messages.Count();
    }
    
    private void LoadData(LoadDataArgs args)
    {
        _isLoading = true;
        OnMessagessChanged();
        _isLoading = false;
    }
}