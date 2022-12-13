using Casper.Network.SDK.SSE;
using Casper.Network.SDK.Types;

namespace NCTLWebExplorer.Services;

public class EventStore
{
    private readonly ISSEClient _sseService;
    private readonly ILogger<EventStore> _logger;
    
    private readonly List<Block> _blocks = new();
    private readonly List<DeployProcessed> _deploys = new();
    
    private readonly string _cbBlocksName = Guid.NewGuid().ToString();
    private readonly string _cbDeploysName = Guid.NewGuid().ToString();
    
    public delegate void NewBlockHandler(Block newBlock);
    public event NewBlockHandler BlockAdded;

    public delegate void NewDeployHandler(DeployProcessed newDeploy);
    
    public event NewDeployHandler DeployAdded;

    public IEnumerable<Block> Blocks => _blocks;

    public IEnumerable<DeployProcessed> Deploys => _deploys;
    
    public EventStore(ISSEClient sseService, ILogger<EventStore> logger)
    {
        _sseService = sseService;
        _logger = logger;
        
        try
        {
            _sseService.AddEventCallback(EventType.BlockAdded, _cbBlocksName,  NewEventCallback);
            _sseService.AddEventCallback(EventType.DeployProcessed, _cbDeploysName,  NewEventCallback);

            _sseService.StartListening();
        }
        catch
        {
            // ignored
        }
    }
    
    private void NewEventCallback(SSEvent evt)
    {
        _logger.LogTrace($"New event {evt.Id} - {evt.EventType}");
        
        if (evt.EventType == EventType.BlockAdded)
        {
            var blockAdded = evt.Parse<BlockAdded>();
            _blocks.Add(blockAdded.Block);
            OnBlockAdded(blockAdded.Block);
        }
        else if (evt.EventType == EventType.DeployProcessed)
        {
            var deployProcessed = evt.Parse<DeployProcessed>();
            _deploys.Add(deployProcessed);
            OnDeployAdded(deployProcessed);
        }
        else if (evt.EventType == EventType.DeployAccepted)
        {
            var deployAccepted = evt.Parse<DeployAccepted>();

            if (deployAccepted.Session is ModuleBytesDeployItem moduleBytesDeployItem)
            {
                //do something with moduleBytesDeployItem
            }
            else if (deployAccepted.Session is TransferDeployItem transferDeployItem)
            {
                //do something with transferDeployItem
            }
            // same with other session types
        }
    }
    
    protected virtual void OnBlockAdded(Block block)
    {
        // make a copy to be more thread-safe
        var handler = BlockAdded;

        // invoke the subscribed event-handler(s)
        handler?.Invoke(block);
    }
    
    protected virtual void OnDeployAdded(DeployProcessed deploy)
    {
        // make a copy to be more thread-safe
        var handler = DeployAdded;

        // invoke the subscribed event-handler(s)
        handler?.Invoke(deploy);
    }
}
