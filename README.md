# Casper .NET SDK Web

This library is an extension of the [Casper .NET SDK](https://github.com/make-software/casper-net-sdk) to build web applications with Blazor or ASP.NET Core.

The main components are:

* `CasperRPCService`: a service class to call RPC endpoints in a Casper node.
* `CasperSSEService`: a service class to listen for server side events from a Casper node.
* `CasperSignerInterop`: a service class to communicate with the Casper Signer browser extension.
* `CasperLedgerInterop`: a service class to communicate with a Ledger device via the browser WebUSB API.

## Documentation

The main SDK documentation, examples and tutorials can be found [here](https://make-software.github.io/casper-net-sdk/). Articles for the web extensions is in progress and will be added soon to the site.

## Prerequisites

To use this Clients library you'll need to have .NET 5 or later installed in your system.

## Get started

This library is published as a nuget package in [nuget.org](https://www.nuget.org/packages/Casper.Network.SDK.Clients).

To add a reference to the Web library in your project, use the Package Manager in Visual Studio or the `dotnet` cli tool.

#### Package Manager (Windows)
```
Install-Package Casper.Network.SDK.Web
``` 

#### dotnet cli tool (Windows/Mac/Linux)
```
dotnet add package Casper.Network.SDK.Web
``` 

### Add services to the DI container

You need to register the services you'll use in your application into the Dependency Injection container. Add to your `Program.cs` file the services you need:

```c#
builder.Services.AddCasperRPCService(builder.Configuration);
builder.Services.AddCasperSSEService(builder.Configuration);
builder.Services.AddCasperSignerInterop();
builder.Services.AddCasperLedgerInterop();
```

If you need one of the contract clients classes, you may register it as well. For example, for the [CEP47 client](https://github.com/make-software/casper-net-sdk-clients) class, add to the `Program.cs` file the following code:

```c#
builder.Services.AddTransient<ICEP47Client, CEP47Client>(provider =>
{
    if (provider.GetService(typeof(ICasperClient)) is not ICasperClient rpcService)
        throw new Exception("Not able to get an ICasperClient instance to boot up.");
    
    if (provider.GetService(typeof(IConfiguration)) is not IConfiguration configService)
        throw new Exception("Not able to get an IConfiguration instance to boot up.");
    
    return new CEP47Client(rpcService, configService["Casper.Network.SDK.Web:ChainName"]);
});
```

Finally, in your `appsettings.json` you must specify some configuration variables the services will look up during construction:

```
{
  ...  
  "Casper.Network.SDK.Web" : {
    "NodeAddress": "http://testnet-node.make.services:7777/rpc",
    "ClientFactory": "caspernode",
    "ChainName": "casper-net-1"
  },
  ...
}
```

## Demo

The directory `Docs/Demos` contains a demo project that shows how to configure the service classes in the Dependency Injection container and use them in the components classes. The application is built with the Blazor framework and demonstrates also the integration with the ERC20 client in the [Clients](https://github.com/make-software/casper-net-sdk-clients) library as well as how to interact with the Casper Signer extension.

## Create a workspace in Gitpod

Click the button to start coding in Gitpod with an online IDE.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/make-software/casper-net-sdk-web)

