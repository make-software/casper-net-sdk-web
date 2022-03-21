using System.Threading;
using System.Threading.Tasks;
using Casper.Network.SDK.JsonRpc;
using Casper.Network.SDK.JsonRpc.ResultTypes;
using Casper.Network.SDK.Types;

namespace Casper.Network.SDK.Web
{
    public interface ICasperRPCService
    {
        public string ChainName { get; }
        
        public Task<string> GetStateRootHash(string blockHash = null);

        public Task<string> GetStateRootHash(int blockHeight);

        public Task<RpcResponse<GetNodeStatusResult>> GetNodeStatus();

        public Task<RpcResponse<GetNodePeersResult>> GetNodePeers();

        public Task<RpcResponse<GetAuctionInfoResult>> GetAuctionInfo(string blockHash = null);

        public Task<RpcResponse<GetAuctionInfoResult>> GetAuctionInfo(int blockHeight);

        public Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(PublicKey publicKey, string blockHash = null);

        public Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(string publicKey, string blockHash = null);

        public Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(PublicKey publicKey, int blockHeight);

        public Task<RpcResponse<GetAccountInfoResult>> GetAccountInfo(string publicKey, int blockHeight);

        public Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalState(string key, string stateRootHash = null,
            string path = null);
        
        public Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalState(GlobalStateKey key, string stateRootHash = null,
            string path = null);

        public Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalStateWithBlockHash(string key, string blockHash,
            string path = null);

        public Task<RpcResponse<QueryGlobalStateResult>> QueryGlobalStateWithBlockHash(GlobalStateKey key, string blockHash, 
            string path = null);

        public Task<RpcResponse<GetBalanceResult>> GetAccountBalance(string purseURef,
            string stateRootHash = null);

        public Task<RpcResponse<GetBalanceResult>> GetAccountBalance(URef purseURef,
            string stateRootHash = null);

        public Task<RpcResponse<GetBalanceResult>> GetAccountBalance(PublicKey publicKey,
            string stateRootHash = null);

        public Task<RpcResponse<PutDeployResult>> PutDeploy(Deploy deploy);

        public Task<RpcResponse<GetDeployResult>> GetDeploy(string deployHash,
            CancellationToken cancellationToken = default(CancellationToken));
        
        public Task<RpcResponse<GetBlockResult>> GetBlock(string blockHash = null);

        public Task<RpcResponse<GetBlockResult>> GetBlock(int blockHeight);

        public Task<RpcResponse<GetBlockTransfersResult>> GetBlockTransfers(string blockHash = null);
        
        public Task<RpcResponse<GetBlockTransfersResult>> GetBlockTransfers(int blockHeight);

        public Task<RpcResponse<GetEraInfoBySwitchBlockResult>> GetEraInfoBySwitchBlock(string blockHash = null);

        public Task<RpcResponse<GetEraInfoBySwitchBlockResult>> GetEraInfoBySwitchBlock(int blockHeight);

        public Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItem(string dictionaryItem, string stateRootHash = null);

        public Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItemByAccount(string accountKey, string dictionaryName,
            string dictionaryItem, string stateRootHash = null);
        
        public Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItemByContract(string contractKey, string dictionaryName, 
            string dictionaryItem, string stateRootHash = null);

        public Task<RpcResponse<GetDictionaryItemResult>> GetDictionaryItemByURef(string seedURef,
            string dictionaryItem, string stateRootHash = null);

        public Task<RpcResponse<GetValidatorChangesResult>> GetValidatorChanges();

        public Task<string> GetRpcSchema();
    }
}