using Casper.Network.SDK.SSE;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Casper.Network.SDK.Web
{
    /// <summary>
    /// Helper functions to configure the DI container.
    /// </summary>
    public static class Lib
    {
        /// <summary>
        /// Configures the DI container to create scoped instances of the RPC service class.. 
        /// </summary>
        public static void AddCasperRPCService(this IServiceCollection serviceCollection, IConfiguration config)
        {
            var clientFactoryName = config["Casper.Network.SDK.Web:ClientFactory"];
            if (clientFactoryName == null) 
                clientFactoryName = "caspernode";
            
            serviceCollection.AddTransient<RpcLogger>();
            
            serviceCollection.AddHttpClient(clientFactoryName).AddHttpMessageHandler<RpcLogger>();;

            serviceCollection.AddScoped<ICasperClient, CasperRPCService>();
        }

        /// <summary>
        /// Configures the DI container to create scoped instances of the SSE service class.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <param name="config"></param>
        public static void AddCasperSSEService(this IServiceCollection serviceCollection, IConfiguration config)
        {
            serviceCollection.AddSingleton<ISSEClient, CasperSSEService>();
        }
        
        /// <summary>
        /// Configures the DI container to create scoped instances of the Signer helper service class.
        /// </summary>
        public static void AddCasperSignerInterop(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<CasperSignerInterop>();
        }
        
        /// <summary>
        /// Configures the DI container to create scoped instances of the Ledger helper service class.
        /// </summary>
        public static void AddCasperLedgerInterop(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<CasperLedgerInterop>();
        }
    }
}
