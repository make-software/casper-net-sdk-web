using System;
using System.Collections.Generic;
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
    /// <summary>
    /// Client to communicate with a Casper node.
    /// </summary>
    public class CasperRPCService : ICasperClient
    {
        private readonly IHttpClientFactory _clientFactory;
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
            _logger = logger;
            
            _nodeAddress = config["Casper.Network.SDK.Web:NodeAddress"];
            if (_nodeAddress == null)
                throw new Exception("Casper.Network.SDK.Web:NodeAddress configuration key not found!");
            
            _clientFactoryName = config["Casper.Network.SDK.Web:ClientFactory"];
            if (_nodeAddress == null)
                _clientFactoryName = "caspernode";
            
            ChainName = config["Casper.Network.SDK.Web:ChainName"];
            if (ChainName == null)
                throw new Exception("Casper.Network.SDK.Web:ChainName configuration key not found!");
        }

        /// <summary>
        /// Request the state root hash at a given Block.
        /// </summary>
        /// <param name="blockHash">Block hash for which the state root is queried. Null for the most recent.</param>
        public async Task<string> GetStateRootHash(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetStateRootHash");

            return await CasperClient.GetStateRootHash(blockHash);
        }

        /// <summary>
        /// Request the state root hash at a given Block.
        /// </summary>
        /// <param name="blockHeight">Block height for which the state root is queried.</param>
        public async Task<string> GetStateRootHash(int blockHeight)
        {
            _logger.LogInformation($"Call to GetStateRootHash");

            return await CasperClient.GetStateRootHash(blockHeight);
        }

        /// <summary>
        /// Request the current status of the node. 
        /// </summary>
        public async Task<RpcResponse<GetNodeStatusResult>> GetNodeStatus()
        {
            _logger.LogInformation($"Call to GetNodeStatus");

            return await CasperClient.GetNodeStatus();
        }

        /// <summary>
        /// Request a list of peers connected to the node.
        /// </summary>
        public async Task<RpcResponse<GetNodePeersResult>> GetNodePeers()
        {
            _logger.LogInformation($"Call to GetNodePeers");

            return await CasperClient.GetNodePeers();
        }

        /// <summary>
        /// Request the bids and validators at a given block.
        /// </summary>
        /// <param name="blockHash">Block hash for which the auction info is queried. Null for the most recent auction info.</param>
        public async Task<RpcResponse<GetAuctionInfoResult>> GetAuctionInfo(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetAuctionInfo");

            return await CasperClient.GetAuctionInfo(blockHash);
        }

        /// <summary>
        /// Request the bids and validators at a given block. 
        /// </summary>
        /// <param name="blockHeight">Block height for which the auction info is queried.</param>
        public async Task<RpcResponse<GetAuctionInfoResult>> GetAuctionInfo(int blockHeight)
        {
            _logger.LogInformation($"Call to GetAuctionInfo");

            return await CasperClient.GetAuctionInfo(blockHeight);
        }

        /// <summary>
        /// Request the information of an Account in the network.
        /// </summary>
        /// <param name="publicKey">The public key of the account.</param>
        /// <param name="blockHash">A block hash for which the information of the account is queried. Null for most recent information.</param>
        public async Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(PublicKey publicKey,
            string blockHash = null)
        {
            _logger.LogInformation($"Call to GetAccountInfo");

            return await CasperClient.GetAccountInfo(publicKey, blockHash);
        }

        /// <summary>
        /// Request the information of an Account in the network.
        /// </summary>
        /// <param name="publicKey">The public key of the account formatted as a string.</param>
        /// <param name="blockHash">A block hash for which the information of the account is queried. Null for most recent information.</param>
        public async Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(string publicKey,
            string blockHash = null)
        {
            _logger.LogInformation($"Call to GetAccountInfo");

            return await CasperClient.GetAccountInfo(publicKey, blockHash);
        }

        /// <summary>
        /// Request the information of an Account in the network.
        /// </summary>
        /// <param name="publicKey">The public key of the account.</param>
        /// <param name="blockHeight">A block height for which the information of the account is queried.</param>
        public async Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(PublicKey publicKey, int blockHeight)
        {
            _logger.LogInformation($"Call to GetAccountInfo");

            return await CasperClient.GetAccountInfo(publicKey, blockHeight);
        }

        /// <summary>
        /// Request the information of an Account in the network.
        /// </summary>
        /// <param name="publicKey">The public key of the account formatted as an hex-string.</param>
        /// <param name="blockHeight">A block height for which the information of the account is queried.</param>
        public async Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(string publicKey, int blockHeight)
        {
            _logger.LogInformation($"Call to GetAccountInfo");

            return await CasperClient.GetAccountInfo(publicKey, blockHeight);
        }

        /// <summary>
        /// Request the stored value in a global state key.
        /// </summary>
        /// <param name="key">The global state key formatted as a string to query the value from the network.</param>
        /// <param name="stateRootHash">Hash of the state root. Null for the most recent stored value..</param>
        /// <param name="path">The path components starting from the key as base (use '/' as separator).</param>
        public async Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalState(string key, string stateRootHash = null,
            string path = null)
        {
            _logger.LogInformation($"Call to QueryGlobalState");

            return await CasperClient.QueryGlobalState(key, stateRootHash, path);
        }

        /// <summary>
        /// Request the stored value in a global state key.
        /// </summary>
        /// <param name="key">The global state key to query the value from the network.</param>
        /// <param name="stateRootHash">Hash of the state root. Null for the most recent stored value..</param>
        /// <param name="path">The path components starting from the key as base (use '/' as separator).</param>
        public async Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalState(GlobalStateKey key, string stateRootHash = null,
            string path = null)
        {
            _logger.LogInformation($"Call to QueryGlobalState");

            return await CasperClient.QueryGlobalState(key, stateRootHash, path);
        }

        /// <summary>
        /// Request the stored value in a global state key.
        /// </summary>
        /// <param name="key">The global state key formatted as a string to query the value from the network.</param>
        /// <param name="blockHash">The block hash.</param>
        /// <param name="path">The path components starting from the key as base (use '/' as separator).</param>
        public async Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalStateWithBlockHash(string key, string blockHash,
            string path = null)
        {
            _logger.LogInformation($"Call to QueryGlobalStateWithBlockHash");

            return await CasperClient.QueryGlobalStateWithBlockHash(key, blockHash, path);
        }

        /// <summary>
        /// Request the stored value in a global state key.
        /// </summary>
        /// <param name="key">The global state key to query the value from the network.</param>
        /// <param name="blockHash">The block hash.</param>
        /// <param name="path">The path components starting from the key as base (use '/' as separator).</param>
        public async Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalStateWithBlockHash(GlobalStateKey key, string blockHash,
            string path = null)
        {
            _logger.LogInformation($"Call to QueryGlobalState");

            return await CasperClient.QueryGlobalStateWithBlockHash(key, blockHash, path);
        }

        public async Task<RpcResponse<GetItemResult>> QueryState(string key, List<string> path, string blockHash)
        {
            _logger.LogInformation($"Call to QueryGlobalState");

            return await CasperClient.QueryState(key, path, blockHash);
        }
        
        /// <summary>
        /// Request a purse's balance from the network.
        /// </summary>
        /// <param name="purseURef">Purse URef formatted as a string.</param>
        /// <param name="stateRootHash">Hash of the state root.</param>
        public async Task<RpcResponse<GetBalanceResult>> GetAccountBalance(string purseURef,
            string stateRootHash = null)
        {
            _logger.LogInformation(
                $"Call to GetAccountBalance URef: {purseURef}");

            return await CasperClient.GetAccountBalance(purseURef, stateRootHash);
        }

        /// <summary>
        /// Request a purse's balance from the network.
        /// </summary>
        /// <param name="purseURef">Purse URef key.</param>
        /// <param name="stateRootHash">Hash of the state root.</param>
        public async Task<RpcResponse<GetBalanceResult>> GetAccountBalance(URef purseURef,
            string stateRootHash = null)
        {
            _logger.LogInformation(
                $"Call to GetAccountBalance URef: {purseURef}");

            return await CasperClient.GetAccountBalance(purseURef, stateRootHash);
        }

        /// <summary>
        /// Request the balance information of an account given its public key.
        /// </summary>
        /// <param name="publicKey">The public key of the account to request the balance.</param>
        /// <param name="stateRootHash">Hash of the state root.</param>
        public async Task<RpcResponse<GetBalanceResult>> GetAccountBalance(PublicKey publicKey,
            string stateRootHash = null)
        {
            _logger.LogInformation(
                $"Call to GetAccountBalance 0x{publicKey.ToAccountHex()[..4]}..{publicKey.ToAccountHex()[28..32]}");

            return await CasperClient.GetAccountBalance(publicKey, stateRootHash);
        }

        /// <summary>
        /// Send a Deploy to the network for its execution.
        /// </summary>
        /// <param name="deploy">The deploy object.</param>
        /// <exception cref="System.Exception">Throws an exception if the deploy is not signed.</exception>
        public async Task<RpcResponse<PutDeployResult>> PutDeploy(Deploy deploy)
        {
            _logger.LogInformation($"Call to PutDeploy");

            return await CasperClient.PutDeploy(deploy);
        }

        /// <summary>
        /// Request a Deploy object from the network by the deploy hash.
        /// When a cancellation token is included this method waits until the deploy is
        /// executed, i.e. until the deploy contains the execution results information.
        /// </summary>
        /// <param name="deployHash">Hash of the deploy to retrieve.</param>
        /// <param name="cancellationToken">A CancellationToken. Do not include this parameter to return
        /// with the first deploy object returned by the network, even it's not executed.</param>
        /// <exception cref="TaskCanceledException">The token has cancelled the operation before the deploy has been executed.</exception>
        public async Task<RpcResponse<GetDeployResult>> GetDeploy(string deployHash,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            return await GetDeploy(deployHash, false, cancellationToken);
        }
        
        /// <summary>
        /// Request a Deploy object from the network by the deploy hash.
        /// When a cancellation token is included this method waits until the deploy is
        /// executed, i.e. until the deploy contains the execution results information.
        /// </summary>
        /// <param name="deployHash">Hash of the deploy to retrieve.</param>
        /// <param name="finalizedApprovals">Whether to return the deploy with the finalized approvals
        /// substituted. If `false` or omitted, returns the deploy with the approvals that were originally
        /// received by the node.</param>
        /// <param name="cancellationToken">A CancellationToken. Do not include this parameter to return
        /// with the first deploy object returned by the network, even it's not executed.</param>
        /// <exception cref="TaskCanceledException">The token has cancelled the operation before the deploy has been executed.</exception>
        public async Task<RpcResponse<GetDeployResult>> GetDeploy(string deployHash,
            bool finalizedApprovals,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            _logger.LogInformation($"Call to GetDeploy");

            while (!cancellationToken.IsCancellationRequested)
            {
                var response = await CasperClient.GetDeploy(deployHash, finalizedApprovals, cancellationToken);
                if (!cancellationToken.CanBeCanceled ||
                    response.Result.GetProperty("execution_results").GetArrayLength() > 0)
                    return response;
                
                _logger.LogInformation($"Deploy not executed. Sleeping for 3s");
                await Task.Delay(3000);
            }

            throw new TaskCanceledException("GetDeploy operation canceled");
        }

        /// <summary>
        /// Retrieves a Block from the network by its hash. 
        /// </summary>
        /// <param name="blockHash">Hash of the block to retrieve. Null for the most recent block.</param>
        public async Task<RpcResponse<GetBlockResult>> GetBlock(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetBlock");

            return await CasperClient.GetBlock(blockHash);
        }

        /// <summary>
        /// Request a Block from the network by its height number.
        /// </summary>
        /// <param name="blockHeight">Height of the block to retrieve.</param>
        public async Task<RpcResponse<GetBlockResult>> GetBlock(int blockHeight)
        {
            _logger.LogInformation($"Call to GetBlock");

            return await CasperClient.GetBlock(blockHeight);
        }

        /// <summary>
        /// Request all transfers for a Block by its block hash.
        /// </summary>
        /// <param name="blockHash">Hash of the block to retrieve the transfers from. Null for the most recent block</param>
        public async Task<RpcResponse<GetBlockTransfersResult>> GetBlockTransfers(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetBlockTransfers");

            return await CasperClient.GetBlockTransfers(blockHash);
        }

        /// <summary>
        /// Request all transfers for a Block by its height number.
        /// </summary>
        /// <param name="blockHeight">Height of the block to retrieve the transfers from.</param>
        public async Task<RpcResponse<GetBlockTransfersResult>> GetBlockTransfers(int blockHeight)
        {
            _logger.LogInformation($"Call to GetBlockTransfers");

            return await CasperClient.GetBlockTransfers(blockHeight);
        }
        
        /// <summary>
        /// Request an EraInfo from the network given a switch block.
        /// For a non-switch block this method returns an empty response.
        /// </summary>
        /// <param name="blockHash">Block hash of a switch block. Null for the latest block.</param>
        public async Task<RpcResponse<GetEraInfoBySwitchBlockResult>> GetEraInfoBySwitchBlock(string blockHash = null)
        {
            _logger.LogInformation($"Call to GetEraInfoBySwitchBlock");

            return await CasperClient.GetEraInfoBySwitchBlock(blockHash);
        }
        
        /// <summary>
        /// Request an EraInfo from the network given a switch block.
        /// For a non-switch block this method returns an empty response.
        /// </summary>
        /// <param name="blockHeight">Block height of a switch block.</param>
        public async Task<RpcResponse<GetEraInfoBySwitchBlockResult>> GetEraInfoBySwitchBlock(int blockHeight)
        {
            _logger.LogInformation($"Call to GetEraInfoBySwitchBlock");

            return await CasperClient.GetEraInfoBySwitchBlock(blockHeight);
        }
        
        /// <summary>
        /// Lookup a dictionary item from its dictionary item key.
        /// </summary>
        /// <param name="dictionaryItem">The dictionary item key to retrieve.</param>
        /// <param name="stateRootHash">Hash of the state root.</param>
        public async Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItem(string dictionaryItem, string stateRootHash = null)
        {
            _logger.LogInformation($"Call to GetDictionaryItem");

            return await CasperClient.GetDictionaryItem(dictionaryItem, stateRootHash);
        }
        
        /// <summary>
        /// Lookup a dictionary item via an Account's named keys.
        /// </summary>
        /// <param name="accountKey">The account key as a formatted string whose named keys contains dictionaryName.</param>
        /// <param name="dictionaryName">The named key under which the dictionary seed URef is stored.</param>
        /// <param name="dictionaryItem">The dictionary item key.</param>
        /// <param name="stateRootHash">Hash of the state root.</param>
        public async Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItemByAccount(string accountKey, string dictionaryName, 
            string dictionaryItem, string stateRootHash = null)
        {
            _logger.LogInformation($"Call to GetDictionaryItemByAccount");

            return await CasperClient.GetDictionaryItemByAccount(accountKey, dictionaryName,
                dictionaryItem, stateRootHash);
        }

        /// <summary>
        /// Lookup a dictionary item via a Contract named keys.
        /// </summary>
        /// <param name="contractKey">The contract key as a formatted string whose named keys contains dictionaryName.</param>
        /// <param name="dictionaryName">The named key under which the dictionary seed URef is stored.</param>
        /// <param name="dictionaryItem">The dictionary item key.</param>
        /// <param name="stateRootHash">Hash of the state root.</param>
        public async Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItemByContract(string contractKey, string dictionaryName,
            string dictionaryItem, string stateRootHash = null)
        {
            _logger.LogInformation($"Call to GetDictionaryItemByContract");

            return await CasperClient.GetDictionaryItemByContract(contractKey, dictionaryName,
                dictionaryItem, stateRootHash);
        }
        
        /// <summary>
        /// Lookup a dictionary item via its seed URef.
        /// </summary>
        /// <param name="seedURef">The dictionary's seed URef.</param>
        /// <param name="dictionaryItem">The dictionary item key.</param>
        /// <param name="stateRootHash">Hash of the state root.</param>
        /// <returns></returns>
        public async Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItemByURef(string seedURef, 
            string dictionaryItem, string stateRootHash = null)
        {
            _logger.LogInformation($"Call to GetDictionaryItemByURef");

            return await CasperClient.GetDictionaryItemByURef(seedURef,
                dictionaryItem, stateRootHash);
        }
        
        /// <summary>
        /// Request the status changes of active validators.
        /// </summary>
        public async Task<RpcResponse<GetValidatorChangesResult>> GetValidatorChanges()
        {
            _logger.LogInformation($"Call to GetValidatorChanges");

            return await CasperClient.GetValidatorChanges();
        }
        
        /// <summary>
        /// Request the RPC Json schema to the network node.
        /// </summary>
        public async Task<string> GetRpcSchema()
        {
            _logger.LogInformation($"Call to GetRpcSchema");

            return await CasperClient.GetRpcSchema();
        }
    }
}
