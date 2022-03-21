using System;
using System.Net.Http;
using System.Threading.Tasks;
using Casper.Network.SDK.SSE;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Casper.Network.SDK.Web
{
    public class CasperSSEService : ICasperSSEService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _config;
        private readonly ILogger<CasperSSEService> _logger;

        private readonly string _host;
        private readonly int _port;
        private readonly ServerEventsClient _sseClient;
        
        public CasperSSEService(IHttpClientFactory httpClientFactory,
            IConfiguration config,
            ILogger<CasperSSEService> logger)
        {
            _clientFactory = httpClientFactory;
            _config = config;
            _logger = logger;
            
            if ((_host = _config["Casper.Network.SDK.Web:SSEHost"]) == null)
                throw new Exception("SSEHost not found!");
            
            if(!int.TryParse(_config["Casper.Network.SDK.Web:SSEPort"], out _port))
                throw new Exception("SSPort not found!");

            _sseClient = new ServerEventsClient(_host, _port);
        }
        
        public void AddEventCallback(EventType eventType, string name, EventCallback cb, int startFrom = int.MaxValue)
        {
            _logger.LogInformation($"Add Event Callback with name '{name}'");
            
            _sseClient.AddEventCallback(eventType, name, cb, startFrom);
        }

        public bool RemoveEventCallback(EventType eventType, string name)
        {
            _logger.LogInformation($"Remove Event Callback with name '{name}'");

            return _sseClient.RemoveEventCallback(eventType, name);
        }

        public void StartListening()
        {
            _logger.LogInformation("Start listening to SSE events");

            _sseClient.StartListening();
        }

        public async Task StopListening()
        {
            _logger.LogInformation("Stop listening to SSE events");

            await _sseClient.StopListening();
        }

        public void Wait()
        {
            _logger.LogInformation("Waiting for disconnection of all channels.");

            _sseClient.Wait();
        }
    }
}