using System.Text.Json;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.Types;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.DependencyInjection;
using System.Numerics;

#pragma warning disable CS8602

namespace Casper.Network.SDK.Web.Test;

public class CasperRPCServiceTests
{
    private WebApplicationFactory<Program>? _applicationFactory;
    private ICasperClient? _casperClient;
    
    [SetUp]
    public void Setup()
    {
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
                    services.AddTransient<RpcLogger>();
                    services.AddHttpClient("caspernode").AddHttpMessageHandler<RpcLogger>();;
                    services.AddTransient<ICasperClient, CasperRPCService>();
                });
            });

        Assert.That(_applicationFactory, Is.Not.Null);
        
        _casperClient = _applicationFactory.Services.GetService(typeof(ICasperClient)) as ICasperClient;
        
        Assert.That(_casperClient, Is.Not.Null);
    }

    [TearDown]
    public async Task DisposeArtifacts()
    {
        await _applicationFactory.DisposeAsync();
    }
    
    [Test]
    public async Task GetStateRootHashTest()
    {
        var stateRootHash = await _casperClient.GetStateRootHash();
        Assert.That(stateRootHash, Is.Not.Null);
        Assert.That(stateRootHash, Has.Length.EqualTo(64));
    }

    [Test]
    public async Task GetNodeStatusTest()
    {
        var rpcResponse = await _casperClient.GetNodeStatus();
        Assert.That(rpcResponse.Result.GetRawText(), Is.Not.Empty);
        Assert.That(rpcResponse.JsonRpc, Is.EqualTo("2.0"));
        Assert.That(rpcResponse.Id, Is.Not.EqualTo(0));
            
        var nodeStatus = rpcResponse.Parse();
        Assert.That(nodeStatus.ApiVersion, Is.Not.Empty);
    }

    [Test]
    public async Task GetBlockTest()
    {
        var rpcResponse = await _casperClient.GetBlock();
        Assert.That(rpcResponse, Is.Not.Null);
        
        var result = rpcResponse.Parse();
        Assert.That(result.Block.Hash, Has.Length.EqualTo(64));

        const string blockHash = "ce96c6702b89370ba3dd73fec311adc748c5234930a68bc4569c7f657257aab5";
        var rpcResponse2 =
            await _casperClient.GetBlock(blockHash);
        Assert.That(rpcResponse2, Is.Not.Null);

        var result2 = rpcResponse2.Parse();
        Assert.That(result2.Block.Hash, Is.EqualTo(blockHash));

        const int blockHeight = 1_098_765;
        var rpcResponse3 =
            await _casperClient.GetBlock(blockHeight);
        Assert.That(rpcResponse3, Is.Not.Null);

        var result3 = rpcResponse3.Parse();
        Assert.That(result3.Block.Height, Is.EqualTo(blockHeight));
        Assert.That(result3.Block.Hash, Is.EqualTo(blockHash));
    }
        
    [Test]
    public async Task GetNodePeersTest()
    {
        var rpcResponse = await _casperClient.GetNodePeers();
        Assert.IsNotEmpty(rpcResponse.Result.GetRawText());

        var nodePeers = rpcResponse.Parse();
        Assert.IsNotEmpty(nodePeers.ApiVersion);
        Assert.IsTrue(nodePeers.Peers.Count > 0);
        Assert.IsNotEmpty(nodePeers.Peers[0].Address);
        Assert.IsNotEmpty(nodePeers.Peers[0].NodeId);
    }

    [Test]
    public async Task GetAccountTest()
    {
        var account = PublicKey.FromHexString("018afa98ca4be12d613617f7339a2d576950a2f9a92102ca4d6508ee31b54d2c02");
        try
        {
            var response = await _casperClient.GetAccountInfo(account, 1);
            var accountInfo = response.Parse();
            Assert.That(accountInfo.Account.AccountHash.ToString(), Is.Not.Empty);

            var response2 = await _casperClient.GetAccountBalance(account);
            var accountBalance = response2.Parse();
            Assert.That(accountBalance.BalanceValue > 0, Is.True);

            var response3 = await _casperClient.GetAccountBalance(accountInfo.Account.MainPurse);
            var accountBalance2 = response3.Parse();
            Assert.That(accountBalance2.BalanceValue, Is.EqualTo(accountBalance.BalanceValue));
        }
        catch (RpcClientException e)
        {
            Assert.Fail(e.RpcError.Message);
        }
    }
        
    [Test]
    public async Task GetValidatorChangesTest()
    {
        try
        {
            var response = await _casperClient.GetValidatorChanges();
            var changes = response.Parse();
            Assert.IsNotNull(changes.Changes);
        }
        catch (RpcClientException e)
        {
            Assert.Fail(e.RpcError.Message);
        }
    }
        
    [Test]
    public async Task GetRpcSchemaTest()
    {
        try
        {
            var schema = await _casperClient.GetRpcSchema();
            Assert.IsNotEmpty(schema);

            var doc = JsonDocument.Parse(schema);
            Assert.IsNotNull(doc);
        }
        catch (RpcClientException e)
        {
            Assert.Fail(e.RpcError.Message);
        }
    }
    
    [Test]
    public async Task PutDeployWrongSignatureTest()
    {
        var srcKey = PublicKey.FromHexString("010b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b");
        var tgtKey = PublicKey.FromHexString("010a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a");

        var transfer = DeployTemplates.StandardTransfer(srcKey, tgtKey, new BigInteger(100_000_000_000),
            new BigInteger(2_500_000_000), "casper-test", 1);

        // sign the deploy with a random key (not matching the deploy public key)
        //
        var sk = KeyPair.CreateNew(KeyAlgo.ED25519);
        transfer.Sign(sk);

        var ex = Assert.ThrowsAsync<RpcClientException>(async () => await _casperClient.PutDeploy(transfer));
        Assert.That(ex, Is.Not.Null);
    }
}
