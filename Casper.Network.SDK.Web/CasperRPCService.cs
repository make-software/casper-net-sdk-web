using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.JsonRpc.ResultTypes;
using Casper.Network.SDK.Types;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Casper.Network.SDK.Web
{
    public class CasperRPCService : ICasperClient
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _config;
        private readonly ILogger<CasperRPCService> _logger;

        private readonly string _nodeAddress;
        private readonly string _clientFactoryName;
        
        private NetCasperClient CasperClient => 
            new NetCasperClient(_nodeAddress, _clientFactory.CreateClient(_clientFactoryName));
        
        public string ChainName { get; }
        
        public CasperRPCService(IHttpClientFactory httpClientFactory,
            IConfiguration config,
            ILogger<CasperRPCService> logger)
        {
            _clientFactory = httpClientFactory;
            _config = config;
            _logger = logger;
            
            _nodeAddress = _config["Casper.Network.SDK.Web:NodeAddress"];
            if (_nodeAddress == null)
                throw new Exception("Casper.Network.SDK.Web:NodeAddress configuration key not found!");
            
            _clientFactoryName = _config["Casper.Network.SDK.Web:ClientFactory"];
            if (_nodeAddress == null)
                _clientFactoryName = "caspernode";
            
            ChainName = _config["Casper.Network.SDK.Web:ChainName"];
            if (ChainName == null)
                throw new Exception("Casper.Network.SDK.Web:NodeAddress configuration key not found!");
        }

        public async Task<string> GetStateRootHash(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetStateRootHash");

            return await CasperClient.GetStateRootHash(blockHash);
        }

        public async Task<string> GetStateRootHash(int blockHeight)
        {
            _logger.LogInformation($"Call to GetStateRootHash");

            return await CasperClient.GetStateRootHash(blockHeight);
        }

        public async Task<RpcResponse<GetNodeStatusResult>> GetNodeStatus()
        {
            _logger.LogInformation($"Call to GetNodeStatus");

            return await CasperClient.GetNodeStatus();
        }

        public async Task<RpcResponse<GetNodePeersResult>> GetNodePeers()
        {
            _logger.LogInformation($"Call to GetNodePeers");

            return await CasperClient.GetNodePeers();
        }

        public async Task<RpcResponse<GetAuctionInfoResult>> GetAuctionInfo(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetAuctionInfo");

            return await CasperClient.GetAuctionInfo(blockHash);
        }

        public async Task<RpcResponse<GetAuctionInfoResult>> GetAuctionInfo(int blockHeight)
        {
            _logger.LogInformation($"Call to GetAuctionInfo");

            return await CasperClient.GetAuctionInfo(blockHeight);
        }

        public async Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(PublicKey publicKey,
            string blockHash = null)
        {
            _logger.LogInformation($"Call to GetAccountInfo");

            return await CasperClient.GetAccountInfo(publicKey, blockHash);
        }

        public async Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(string publicKey,
            string blockHash = null)
        {
            _logger.LogInformation($"Call to GetAccountInfo");

            return await CasperClient.GetAccountInfo(publicKey, blockHash);
        }

        public async Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(PublicKey publicKey, int blockHeight)
        {
            _logger.LogInformation($"Call to GetAccountInfo");

            return await CasperClient.GetAccountInfo(publicKey, blockHeight);
        }

        public async Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(string publicKey, int blockHeight)
        {
            _logger.LogInformation($"Call to GetAccountInfo");

            return await CasperClient.GetAccountInfo(publicKey, blockHeight);
        }

        public async Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalState(string key, string stateRootHash = null,
            string path = null)
        {
            _logger.LogInformation($"Call to QueryGlobalState");

            return await CasperClient.QueryGlobalState(key, stateRootHash, path);
        }

        public async Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalState(GlobalStateKey key, string stateRootHash = null,
            string path = null)
        {
            _logger.LogInformation($"Call to QueryGlobalState");

            return await CasperClient.QueryGlobalState(key, stateRootHash, path);
        }

        public async Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalStateWithBlockHash(string key, string blockHash,
            string path = null)
        {
            _logger.LogInformation($"Call to QueryGlobalStateWithBlockHash");

            return await CasperClient.QueryGlobalStateWithBlockHash(key, blockHash, path);
        }

        public async Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalStateWithBlockHash(GlobalStateKey key, string blockHash,
            string path = null)
        {
            _logger.LogInformation($"Call to QueryGlobalState");

            return await CasperClient.QueryGlobalStateWithBlockHash(key, blockHash, path);
        }

        public async Task<RpcResponse<GetBalanceResult>> GetAccountBalance(string purseURef,
            string stateRootHash = null)
        {
            _logger.LogInformation(
                $"Call to GetAccountBalance URef: {purseURef}");

            return await CasperClient.GetAccountBalance(purseURef, stateRootHash);
        }

        public async Task<RpcResponse<GetBalanceResult>> GetAccountBalance(URef purseURef,
            string stateRootHash = null)
        {
            _logger.LogInformation(
                $"Call to GetAccountBalance URef: {purseURef}");

            return await CasperClient.GetAccountBalance(purseURef, stateRootHash);
        }

        public async Task<RpcResponse<GetBalanceResult>> GetAccountBalance(PublicKey publicKey,
            string stateRootHash = null)
        {
            _logger.LogInformation(
                $"Call to GetAccountBalance 0x{publicKey.ToAccountHex()[..4]}..{publicKey.ToAccountHex()[28..32]}");

            return await CasperClient.GetAccountBalance(publicKey, stateRootHash);
        }

        public async Task<RpcResponse<PutDeployResult>> PutDeploy(Deploy deploy)
        {
            _logger.LogInformation($"Call to PutDeploy");

            return await CasperClient.PutDeploy(deploy);
        }

        public async Task<RpcResponse<GetDeployResult>> GetDeploy(string deployHash,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            _logger.LogInformation($"Call to GetDeploy");

            while (!cancellationToken.IsCancellationRequested)
            {
                var response = await CasperClient.GetDeploy(deployHash, cancellationToken);
                if (!cancellationToken.CanBeCanceled ||
                    response.Result.GetProperty("execution_results").GetArrayLength() > 0)
                    return response;

                _logger.LogInformation($"Deploy not executed. Sleeping for 3s");
                await Task.Delay(3000);
            }

            throw new TaskCanceledException("GetDeploy operation canceled");
        }

        public async Task<RpcResponse<GetBlockResult>> GetBlock(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetBlock");

            return await CasperClient.GetBlock(blockHash);
        }

        public async Task<RpcResponse<GetBlockResult>> GetBlock(int blockHeight)
        {
            _logger.LogInformation($"Call to GetBlock");

            return await CasperClient.GetBlock(blockHeight);
        }

        public async Task<RpcResponse<GetBlockTransfersResult>> GetBlockTransfers(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetBlockTransfers");

            return await CasperClient.GetBlockTransfers(blockHash);
        }

        public async Task<RpcResponse<GetBlockTransfersResult>> GetBlockTransfers(int blockHeight)
        {
            _logger.LogInformation($"Call to GetBlockTransfers");

            return await CasperClient.GetBlockTransfers(blockHeight);
        }
        
        public async Task<RpcResponse<GetEraInfoBySwitchBlockResult>> GetEraInfoBySwitchBlock(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetEraInfoBySwitchBlock");

            return await CasperClient.GetEraInfoBySwitchBlock(blockHash);
        }
        
        public async Task<RpcResponse<GetEraInfoBySwitchBlockResult>> GetEraInfoBySwitchBlock(int blockHeight)
        {
            _logger.LogInformation($"Call to GetEraInfoBySwitchBlock");

            return await CasperClient.GetEraInfoBySwitchBlock(blockHeight);
        }
        
        public async Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItem(string dictionaryItem, string stateRootHash = null)
        {
            _logger.LogInformation($"Call to GetDictionaryItem");

            return await CasperClient.GetDictionaryItem(dictionaryItem, stateRootHash);
        }
        
        public async Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItemByAccount(string accountKey, string dictionaryName, 
            string dictionaryItem, string stateRootHash = null)
        {
            _logger.LogInformation($"Call to GetDictionaryItemByAccount");

            return await CasperClient.GetDictionaryItemByAccount(accountKey, dictionaryName,
                dictionaryItem, stateRootHash);
        }

        public async Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItemByContract(string contractKey, string dictionaryName,
            string dictionaryItem, string stateRootHash = null)
        {
            _logger.LogInformation($"Call to GetDictionaryItemByContract");

            return await CasperClient.GetDictionaryItemByContract(contractKey, dictionaryName,
                dictionaryItem, stateRootHash);
        }
        
        public async Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItemByURef(string seedURef, 
            string dictionaryItem, string stateRootHash = null)
        {
            _logger.LogInformation($"Call to GetDictionaryItemByURef");

            return await CasperClient.GetDictionaryItemByURef(seedURef,
                dictionaryItem, stateRootHash);
        }
        
        public async Task<RpcResponse<GetValidatorChangesResult>> GetValidatorChanges()
        {
            _logger.LogInformation($"Call to GetValidatorChanges");

            return await CasperClient.GetValidatorChanges();
        }
        
        public async Task<string> GetRpcSchema()
        {
            _logger.LogInformation($"Call to GetRpcSchema");

            return await CasperClient.GetRpcSchema();
        }
    }
}