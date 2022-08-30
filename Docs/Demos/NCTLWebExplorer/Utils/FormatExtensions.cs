namespace NCTLWebExplorer.Utils;

public static class FormatExtensions
{
    public static string FormatHash(this string hash)
    {
        var len = hash.Length;
        return $"{hash.Substring(0, 8)}....{hash.Substring(len-8, 8)}";
    }
    
    public static string FormatPublicKey(this string pk)
    {
        var len = pk.Length;
        return $"{pk.Substring(0, 4)}....{pk.Substring(len-4, 4)}";
    }
}
