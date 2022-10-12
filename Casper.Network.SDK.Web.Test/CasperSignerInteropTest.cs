using System.Numerics;
using System.Text.Json;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.JSInterop;
using Moq;

#pragma warning disable CS8602

namespace Casper.Network.SDK.Web.Test;

public class CasperSignerInteropTest
{
    private WebApplicationFactory<Program>? _applicationFactory;
    private CasperSignerInterop? _casperSignerInterop;
    private Mock<IJSObjectReference> _jsObjMock = new();
    
    [OneTimeSetUp]
    public void Setup()
    {
        _jsObjMock = new Mock<IJSObjectReference>();
        _jsObjMock.Setup(x => x.InvokeAsync<bool>(It.IsAny<string>(), It.IsAny<object[]>()))
            .Returns(new ValueTask<bool>(true));
        _jsObjMock.Setup(x => x.InvokeAsync<string>(It.Is<string>(s => s.Equals("getVersion")), It.IsAny<object[]>()))
            .Returns(new ValueTask<string>("1.0.0"));
        _jsObjMock.Setup(x => x.InvokeAsync<string>(It.Is<string>(s => s.Equals("getActivePublicKey")), It.IsAny<object[]>()))
            .Returns(new ValueTask<string>("01000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F"));        
        _jsObjMock.Setup(x => x.InvokeAsync<SignerState>(It.Is<string>(s => s.Equals("getCasperSignerState")), It.IsAny<object[]>()))
            .Returns(new ValueTask<SignerState>(new SignerState()
            {
                IsConnected = true,
                IsUnlocked = true,
                ActivePK = "01000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F"
            }));
        _jsObjMock.Setup(x => x.InvokeAsync<JsonElement>(It.Is<string>(s => s.Equals("sign")), It.IsAny<object[]>()))
            .Returns(new ValueTask<JsonElement>(JsonDocument.Parse(@"[{
                    ""signer"":""010b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"",
                    ""signature"":""010b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b""
                }]").RootElement));
        _jsObjMock.Setup(x => x.InvokeAsync<string>(It.Is<string>(s => s.Equals("signMessage")), It.IsAny<object[]>()))
            .Returns(new ValueTask<string>("010b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"));
        
        var jsMock = new Mock<IJSRuntime>();
        jsMock.Setup(x => x.InvokeAsync<IJSObjectReference>(It.IsAny<string>(), It.IsAny<object[]>()))
            .Returns(new ValueTask<IJSObjectReference>(_jsObjMock.Object));
        
        _applicationFactory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureAppConfiguration(configurationBuilder =>
                    configurationBuilder.Add(new JsonConfigurationSource
                    {
                        Path = "testApplication.json",
                        ReloadOnChange = true,
                        Optional = false
                    }).Build()
                );

                builder.ConfigureServices((services) =>
                {
                    services.AddTransient(_ => jsMock.Object);
                    services.AddTransient<CasperSignerInterop>();
                });
            });

        Assert.That(_applicationFactory, Is.Not.Null);
        
        _casperSignerInterop = _applicationFactory.Services.GetService(typeof(CasperSignerInterop)) as CasperSignerInterop;
        
        Assert.That(_casperSignerInterop, Is.Not.Null);
    }

    [SetUp]
    public void BeforeEachTest()
    {
        _jsObjMock.Invocations.Clear();
    }
    
    [TearDown]
    public void AfterEachTest()
    {
        Assert.That(_jsObjMock.Invocations.Count, Is.Not.Zero);
    }
    
    [Test]
    public async Task GetVersionTest()
    {
        var version = await _casperSignerInterop.GetVersion();
        Assert.That(version, Is.EqualTo("1.0.0"));
    }

    [Test]
    public async Task IsSignerPresent()
    {
        var isConnected = await _casperSignerInterop.IsSignerPresent();
        Assert.That(isConnected, Is.True);
    }

    [Test]
    public async Task IsConnectedTest()
    {
        var isConnected = await _casperSignerInterop.IsConnected();
        Assert.That(isConnected, Is.True);
    }

    [Test]
    public async Task GetActivePublicKeyTest()
    {
        var activePk = await _casperSignerInterop.GetActivePublicKey();
        Assert.That(activePk, Is.EqualTo("01000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F"));
    }

    [Test]
    public async Task GetStateTest()
    {
        var signerState = await _casperSignerInterop.GetState();
        Assert.Multiple(() =>
        {
            Assert.That(signerState.IsConnected, Is.True);
            Assert.That(signerState.IsUnlocked, Is.True);
            Assert.That(signerState.ActivePK, Is.EqualTo("01000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F"));
        });
    }

    [Test]
    public async Task RequestSignatureTest()
    {
        var srcKey = PublicKey.FromHexString("010b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b");
        var tgtKey = PublicKey.FromHexString("010a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a");

        var transfer = DeployTemplates.StandardTransfer(srcKey, tgtKey, new BigInteger(100_000_000_000),
            new BigInteger(2_500_000_000), "casper-test", 1);

        var signed =
            await _casperSignerInterop.RequestSignature(transfer, srcKey.ToAccountHex(), tgtKey.ToAccountHex());
        
        Assert.That(signed, Is.True);
        Assert.That(transfer.Approvals, Has.Count.EqualTo(1));
    }

    [Test]
    public async Task SignMessageTest()
    {
        var srcKey = PublicKey.FromHexString("010b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b");
        var tgtKey = PublicKey.FromHexString("010a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a");

        var transfer = DeployTemplates.StandardTransfer(srcKey, tgtKey, new BigInteger(100_000_000_000),
            new BigInteger(2_500_000_000), "casper-test", 1);

        var signature =
            await _casperSignerInterop.SignMessage("sign this message!", srcKey.ToAccountHex());
        
        Assert.That(signature, Has.Length.EqualTo(130));
    }
}
