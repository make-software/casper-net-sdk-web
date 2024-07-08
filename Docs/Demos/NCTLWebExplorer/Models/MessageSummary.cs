using System.Text.Json.Serialization;

namespace NCTLWebExplorer.Models;

public class MessagePayload
{
    public string String { get; set; }
    public string Bytes { get; set; }
}

public class MessageSummary
{
    [JsonPropertyName("message")]
    public MessagePayload Message { get; set; }
    
    [JsonPropertyName("topic_name")]
    public string TopicName { get; set; }
    
    [JsonPropertyName("topic_name_hash")]
    public string TopicNameHash { get; set; }
    
    [JsonPropertyName("entity_hash")]
    public string EntityHash { get; set; }

    [JsonPropertyName("block_index")]
    public uint BlockIndex { get; set; }
    
    [JsonPropertyName("topic_index")]
    public uint TopicIndex { get; set; }
}