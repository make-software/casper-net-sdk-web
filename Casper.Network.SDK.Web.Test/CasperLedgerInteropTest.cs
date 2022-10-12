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

public class CasperLedgerInteropTest
{
    private WebApplicationFactory<Program>? _applicationFactory;
    private CasperLedgerInterop? _casperLedgerInterop;
    private Mock<IJSRuntime> _jsMock = new();

    [OneTimeSetUp]
    public void Setup()
    {
        _jsMock = new Mock<IJSRuntime>();
        _jsMock.Setup(x => x.InvokeAsync<bool>(It.IsAny<string>(), It.IsAny<object[]>()))
            .Returns(new ValueTask<bool>(true));
        _jsMock.Setup(x =>
                x.InvokeAsync<string>(It.Is<string>(s => s.Equals("ledgerInterop.connect")), It.IsAny<object[]>()))
            .Returns<string, object[]>((method, args) =>
            {
                var accIdx = (int) args[0];
                return new ValueTask<string>("0202000000000000000000000000000000000000000000000000000000000000000" +
                                             accIdx);
            });
        _jsMock.Setup(x =>
                x.InvokeAsync<CasperLedgerInterop.CasperAppVersion>(
                    It.Is<string>(s => s.Equals("ledgerInterop.getVersion")), It.IsAny<object[]>()))
            .Returns<string, object[]>((method, args) =>
                new ValueTask<CasperLedgerInterop.CasperAppVersion>(new CasperLedgerInterop.CasperAppVersion()
                    {
                        Major = 1,
                        Minor = 2,
                        Patch = 3,
                        DeviceLocked = true,
                        TargetId = "target-id",
                        TestMode = true
                    }
                ));
        _jsMock.Setup(x =>
                x.InvokeAsync<CasperLedgerInterop.AppInfo>(
                    It.Is<string>(s => s.Equals("ledgerInterop.getAppInfo")), It.IsAny<object[]>()))
            .Returns<string, object[]>((method, args) =>
                new ValueTask<CasperLedgerInterop.AppInfo>(new CasperLedgerInterop.AppInfo()
                    {
                        AppName = "casper",
                    }
                ));
        _jsMock.Setup(x => 
                x.InvokeAsync<string>(It.Is<string>(s => s.Equals("ledgerInterop.sign")), It.IsAny<object[]>()))
            .Returns(new ValueTask<string>("020b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"));
        
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
                    services.AddTransient(_ => _jsMock.Object);
                    services.AddTransient<CasperLedgerInterop>();
                });
            });

        Assert.That(_applicationFactory, Is.Not.Null);

        _casperLedgerInterop =
            _applicationFactory.Services.GetService(typeof(CasperLedgerInterop)) as CasperLedgerInterop;

        Assert.That(_casperLedgerInterop, Is.Not.Null);
    }

    [SetUp]
    public void BeforeEachTest()
    {
        _jsMock.Invocations.Clear();
    }

    [TearDown]
    public void AfterEachTest()
    {
        Assert.That(_jsMock.Invocations.Count, Is.Not.Zero);
    }

    // [Test]
    // public async Task GetVersionTest()
    // {
    //     var version = await _casperSignerInterop.GetVersion();
    //     Assert.That(version, Is.EqualTo("1.0.0"));
    // }

    [TestCase(0, "02020000000000000000000000000000000000000000000000000000000000000000")]
    [TestCase(4, "02020000000000000000000000000000000000000000000000000000000000000004")]
    public async Task ConnectTest(int acctIdx, string expectedPk)
    {
        await _casperLedgerInterop.Connect(acctIdx);
        Assert.That(_casperLedgerInterop.ActivePK, Is.EqualTo(expectedPk));
    }

    [Test]
    public async Task GetCasperAppVersionTest()
    {
        var appVersion = await _casperLedgerInterop.GetCasperAppVersion();
        Assert.Multiple(() =>
        {
            Assert.That(appVersion.Major, Is.EqualTo(1));
            Assert.That(appVersion.Minor, Is.EqualTo(2));
            Assert.That(appVersion.Patch, Is.EqualTo(3));
            Assert.That(appVersion.DeviceLocked, Is.True);
            Assert.That(appVersion.TargetId, Is.EqualTo("target-id"));
            Assert.That(appVersion.TestMode, Is.True);
        });
    }

    [Test]
    public async Task GetAppInfoTest()
    {
        var appInfo = await _casperLedgerInterop.GetAppInfo();
        Assert.Multiple(() => { Assert.That(appInfo.AppName, Is.EqualTo("casper")); });
    }

    [Test]
    public async Task RequestSignatureTest()
    {
        var srcKey = PublicKey.FromHexString("010b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b");
        var tgtKey = PublicKey.FromHexString("010a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a");

        var transfer = DeployTemplates.StandardTransfer(srcKey, tgtKey, new BigInteger(100_000_000_000),
            new BigInteger(2_500_000_000), "casper-test", 1);

        await _casperLedgerInterop.Connect();

        var signed =
            await _casperLedgerInterop.RequestSignature(transfer);

        Assert.That(signed, Is.True);
        Assert.That(transfer.Approvals, Has.Count.EqualTo(1));
        Assert.That(transfer.Approvals[0].Signature.ToString().ToLower(), 
            Is.EqualTo("020b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"));
    }
}
