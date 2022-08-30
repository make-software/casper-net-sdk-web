using Blazored.LocalStorage;
using Casper.Network.SDK;
using Casper.Network.SDK.Clients;
using Casper.Network.SDK.Web;
using Radzen;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

// Add Radzen services.
builder.Services.AddScoped<NotificationService>();

// Add Casper Network SDK services
builder.Services.AddCasperRPCService(builder.Configuration);
builder.Services.AddCasperSSEService(builder.Configuration);
builder.Services.AddCasperSignerInterop();

builder.Services.AddBlazoredLocalStorage();

builder.Services.AddTransient<IERC20Client, ERC20Client>(provider =>
{
    if (provider.GetService(typeof(ICasperClient)) is not ICasperClient rpcService)
        throw new Exception("Not able to get an ICasperClient instance to boot up.");
    
    if (provider.GetService(typeof(IConfiguration)) is not IConfiguration configService)
        throw new Exception("Not able to get an IConfiguration instance to boot up.");
    
    return new ERC20Client(rpcService, configService["Casper.Network.SDK.Web:ChainName"]);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
