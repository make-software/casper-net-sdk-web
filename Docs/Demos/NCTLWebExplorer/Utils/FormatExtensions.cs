using Casper.Network.SDK.Types;

namespace NCTLWebExplorer.Utils;

public static class FormatExtensions
{
    public static string FormatHash(this string hash)
    {
        var len = hash.Length;
        return $"{hash.Substring(0, 5)}...{hash.Substring(len-5, 5)}".ToLower();
    }
    
    public static string FormatPublicKey(this string pk)
    {
        var len = pk.Length;
        return $"{pk.Substring(0, 5)}...{pk.Substring(len-5, 5)}";
    }
    
    public static string FormatPublicKey(this PublicKey pk)
    {
        var len = pk.ToString().Length;
        return $"{pk.ToString().Substring(0, 5)}...{pk.ToString().Substring(len-5, 5)}";
    }
}
