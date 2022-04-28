using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Casper.Network.SDK.Web
{
    /// <summary>
    /// HTTP Delegating handler to log RPC requests/responses
    /// </summary>
    public class RpcLogger : DelegatingHandler
    {
        private readonly ILogger<RpcLogger> _logger;
    
        public RpcLogger(ILogger<RpcLogger> logger)
        {
            _logger = logger;
        }
        
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("Request:");
                _logger.LogDebug(request.ToString());
                if (request.Content != null )
                {
                    _logger.LogDebug(await request.Content.ReadAsStringAsync());
                }
            }

            HttpResponseMessage response;
            try
            {
                response = await base.SendAsync(request, cancellationToken);
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.ToString());
                throw;
            }

            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("Response:");
                _logger.LogDebug(response.ToString());
                _logger.LogDebug(await response.Content.ReadAsStringAsync());
                _logger.LogDebug(string.Empty);            
            }

            return response;
        }
    }
}
