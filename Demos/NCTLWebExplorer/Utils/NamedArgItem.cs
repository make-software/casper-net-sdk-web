using System.Numerics;
using Casper.Network.SDK.Types;
using Org.BouncyCastle.Utilities.Encoders;

namespace NCTLWebExplorer.Utils;

public class NamedArgItem
{
    public string Name;
    public string CLType;
    public bool Option;
    public string Value;

    public bool Valid = true;
    
    private CLValue GetCLValue()
    {
        CLValue value = null;
        if (CLType.Equals("Bool"))
        {
            if (bool.TryParse(Value, out var b))
                value = CLValue.Bool(b);
        }
        else if (CLType.Equals("I32"))
        {
            if (int.TryParse(Value, out var i))
                value = CLValue.I32(i);
        }
        else if (CLType.Equals("I64"))
        {
            if (long.TryParse(Value, out var i))
                value = CLValue.I64(i);
        }
        else if (CLType.Equals("U8"))
        {
            if (byte.TryParse(Value, out var u))
                value = CLValue.U8(u);
        }
        else if (CLType.Equals("U32"))
        {
            if (uint.TryParse(Value, out var u))
                value = CLValue.U32(u);
        }
        else if (CLType.Equals("U64"))
        {
            if (ulong.TryParse(Value, out var u))
                value = CLValue.U64(u);
        }
        else if (CLType.Equals("U128"))
        {
            if (BigInteger.TryParse(Value, out var bigInt))
                value = CLValue.U128(bigInt);
        }
        else if (CLType.Equals("U256"))
        {
            if (BigInteger.TryParse(Value, out var bigInt))
                value = CLValue.U256(bigInt);
        }
        else if (CLType.Equals("U512"))
        {
            if (BigInteger.TryParse(Value, out var bigInt))
                value = CLValue.U512(bigInt);
        }
        else if (CLType.Equals("Unit"))
        {
            value = CLValue.Unit();
        }
        else if (CLType.Equals("String"))
        {
            value = CLValue.String(Value);
        }
        else if (CLType.Equals("ByteArray"))
        {
            try
            {
                byte[] bytes = Hex.Decode(Value);
                value = CLValue.ByteArray(bytes);
            }
            catch
            {
                //ignored
            }
        }
        else if (CLType.Equals("Key"))
        {
            try
            {
                var key = GlobalStateKey.FromString(Value);
                value = CLValue.Key(key);
            }
            catch
            {
                //ignored
            }
        }
        else if (CLType.Equals("URef"))
        {
            try
            {
                value =  CLValue.URef(Value);
            }
            catch
            {
                //ignored
            }
        }
        else if (CLType.Equals("PublicKey"))
        {
            try
            {
                var pk = PublicKey.FromHexString(Value);
                value =  CLValue.PublicKey(pk);
            }
            catch
            {
                //ignored
            }
        }

        if (value == null) return null;
        
        return Option ? CLValue.Option(value) : value;
    }

    public NamedArg GetNamedArg()
    {
        var clValue = GetCLValue();

        if (clValue == null)
            return null;
        
        return new NamedArg(Name, GetCLValue());
    }

    public bool IsValid()
    {
        Valid = !string.IsNullOrWhiteSpace(Name) && GetCLValue() != null;
        return Valid;
    }
}
