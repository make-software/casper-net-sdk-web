using System;
using System.Net.Http;
using Casper.Network.SDK.SSE;
using Microsoft.Extensions.Configuration;

namespace Casper.Network.SDK.Web
{
    /// <summary>
    /// Service class to listen to Server-Side events in a Casper node.
    /// </summary>
    public class CasperSSEService : ServerEventsClient
    {
        private readonly IHttpClientFactory _clientFactory;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="httpClientFactory"></param>
        /// <param name="config">A configuration object to load connection details</param>
        public CasperSSEService(IHttpClientFactory httpClientFactory,
            IConfiguration config)
        {
            _clientFactory = httpClientFactory;
            
            if ((_host = config["Casper.Network.SDK.Web:SSEHost"]) == null)
                throw new Exception("SSEHost not found!");
            
            if(!int.TryParse(config["Casper.Network.SDK.Web:SSEPort"], out _port))
                throw new Exception("SSPort not found!");
            
            if(!int.TryParse(config["Casper.Network.SDK.Web:SSENodeVersion"], out _nodeVersion))
                throw new Exception("SSENodeVersion not found!");
        }
        
        /// <summary>
        /// Returns an instance of an HttpClient from an HttpClientFactory
        /// </summary>
        /// <returns>a new or recycled instance of HttpClient</returns>
        protected override HttpClient _getHttpClient()
        {
            var client = _clientFactory.CreateClient();
            client.BaseAddress = new Uri($"http://{_host}:{_port}");
            return client;
        }
    }
}
