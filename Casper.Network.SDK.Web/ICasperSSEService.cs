using System.Threading.Tasks;
using Casper.Network.SDK.SSE;

namespace Casper.Network.SDK.Web
{
    public interface ICasperSSEService
    {
        public void AddEventCallback(EventType eventType, string name, EventCallback cb, int startFrom = int.MaxValue);

        public bool RemoveEventCallback(EventType eventType, string name);

        public void StartListening();

        public Task StopListening();

        public void Wait();
    }
}