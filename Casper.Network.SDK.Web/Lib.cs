using System;
using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Casper.Network.SDK.Web
{
    public static class Lib
    {
        public static void AddCasperRPCService(this IServiceCollection serviceCollection, IConfiguration config)
        {
            var clientFactoryName = config["Casper.Network.SDK.Web:ClientFactory"];
            if (clientFactoryName == null) 
                clientFactoryName = "caspernode";
            
            serviceCollection.AddTransient<RpcLogger>();
            
            serviceCollection.AddHttpClient(clientFactoryName).AddHttpMessageHandler<RpcLogger>();;

            serviceCollection.AddSingleton<ICasperClient, CasperRPCService>();
        }

        public static void AddCasperSSEService(this IServiceCollection serviceCollection, IConfiguration config)
        {
            serviceCollection.AddSingleton<ICasperSSEService, CasperSSEService>();
        }
        
        public static void AddCasperSignerInterop(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<CasperSignerInterop>();
        }
    }
}