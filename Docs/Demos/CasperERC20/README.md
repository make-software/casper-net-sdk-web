# DEMO: Casper ERC20 Web App

This is a demo app that shows how to configure the service classes in the Dependency Injection container and use them in the components classes. The application is built with the Blazor framework and demonstrates also the integration with the ERC20 client in the [Clients](https://github.com/make-software/casper-net-sdk-clients) library as well as how to interact with the Casper Signer extension.

## Build and run the app

### Build the ERC20 contract

To run this app you'll need to build the ERC20 contract first. Follow the instructions on [https://github.com/casper-ecosystem/erc20](https://github.com/casper-ecosystem/erc20) to obtain the WASM build.

Now, place the file `erc20_token.wasm` in the root folder of the project.

### Adjust environment variables

Review and change if necessary the values in `appsettings.json`. In particular, check that the variables `NodeAddress` and `ChainName` are valid for your environment.

### Run the app

Run the app with:

```
$ dotnet run
```
