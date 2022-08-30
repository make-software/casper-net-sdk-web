using System.Numerics;
using Casper.Network.SDK.Types;
using NCTLWebExplorer.Utils;
using Org.BouncyCastle.Utilities.Encoders;

namespace NCTLWebExplorer.Components;

public partial class NamedArgumentCollection
{
    private List<NamedArgItem> _items = new();

    public List<NamedArg> GetParameters()
    {
        // validate all items
        //
        foreach (var item in _items)
            if (!item.IsValid())
                throw new Exception($"Parameter '{item.Name}' not valid.");
        
        var parameters = new List<NamedArg>();
        foreach (var item in _items)
            parameters.Add(item.GetNamedArg());
        
        return parameters;
    }

    public void AddNamedArg()
    {
        var arg = new NamedArgItem() {Name = "", CLType = "String", Value = ""};
        _items.Add(arg);
        // StateHasChanged();
    }

    public void RemoveItem(NamedArgItem item)
    {
        _items.Remove(item);
    }
}
