using Casper.Network.SDK.Types;

namespace NCTLWebExplorer.Utils;

public class GetKeyFromInput
{
    public static bool TryParse(string input, out object key)
    {
        key = null;
        
        if (string.IsNullOrWhiteSpace(input))
            return false;

        try
        {
            key = GlobalStateKey.FromString(input);
            if (key != null) return true;
        }
        catch
        {
            // ignored
        }

        try
        {
            key = PublicKey.FromHexString(input);
        }
        catch
        {
            // ignored
        }

        return key != null;
    }
}