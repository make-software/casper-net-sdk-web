FROM mcr.microsoft.com/dotnet/aspnet:8.0-cbl-mariner2.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:8.0-cbl-mariner2.0 AS build
COPY ./casper-net-sdk /app/casper-net-sdk
COPY ./casper-net-sdk-web /app/casper-net-sdk-web

WORKDIR "/app/casper-net-sdk-web/Docs/Demos/NCTLWebExplorer"
RUN dotnet restore "NCTLWebExplorer.csproj"
RUN dotnet build "NCTLWebExplorer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NCTLWebExplorer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "NCTLWebExplorer.dll"]
