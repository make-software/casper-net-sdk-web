using System.Threading.Tasks;
using Casper.Network.SDK.Types;

namespace Casper.Network.SDK.Web
{
    public interface IWallet
    {
        /// <summary>
        /// Delegate to receive signer state update events.
        /// </summary>
        public event WalletStateUpdateEventHandler OnStateUpdate;
        /// <summary>
        /// Delegate to receive signer state update events.
        /// </summary>
        public event WalletStateUpdateEventHandlerAsync OnStateUpdateAsync;

        Task<bool> IsWalletPresent();

        Task AddEventListeners();

        Task UpdateState(bool isConnected, bool isUnlocked, string activePublicKey);

        Task<string> GetVersion();

        Task<WalletState> GetState();

        Task<bool> IsConnected();

        Task RequestConnection();

        Task DisconnectFromSite();

        Task<string> GetActivePublicKey();

        Task<bool> RequestSignature(Deploy deploy, string srcPk, string tgtPk);

        Task<string> SignMessage(string message, string signingPublicKey);

    }
}
