using System.Data;
using MySql.Data.MySqlClient;
using NCTLWebExplorer.Models;

namespace NCTLWebExplorer.Services;

public class MysqlEventStore : IEventStore, IDisposable
{
    private readonly ILogger<EventListener> _logger;

    private readonly string _connectionString;
    
    public MysqlEventStore(string connectionString, ILogger<EventListener> logger)
    {
        _connectionString = connectionString;
        _logger = logger;
    }
    
    public void Dispose()
    {
    }
    
    public void AddStep(StepSummary step)
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                string query = @"INSERT INTO Steps 
                            (Id, EraId, RawJson) 
                            VALUES 
                            (@Id, @EraId, @RawJson)";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", step.EventId);
                    command.Parameters.AddWithValue("@EraId", step.EraId);
                    command.Parameters.AddWithValue("@RawJson", step.Json);

                    var n =command.ExecuteNonQuery();
                
                    if(n > 0)
                        _logger.LogInformation($"Added step to store for era {step.EraId}");
                    else
                        _logger.LogError($"Could not store step for era {step.EraId} ");
                }
            }
        }
        catch (Exception e)
        {
            _logger.LogError($"Could not store step. Error: {e.Message}");
        }
    }

    public void AddBlock(BlockSummary block)
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                string query = @"INSERT INTO Blocks 
                            (Id, Hash, EraId, Height, ProtocolVersion, Timestamp, IsEraEnd, Proposer, TransactionCount) 
                            VALUES 
                            (@Id, @Hash, @EraId, @Height, @ProtocolVersion, @Timestamp, @IsEraEnd, @Proposer, @TransactionCount)";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", block.EventId);
                    command.Parameters.AddWithValue("@Hash", block.Hash);
                    command.Parameters.AddWithValue("@EraId", block.EraId);
                    command.Parameters.AddWithValue("@Height", block.Height);
                    command.Parameters.AddWithValue("@ProtocolVersion", block.ProtocolVersion);
                    command.Parameters.AddWithValue("@Timestamp", DateTime.Parse(block.Timestamp));
                    command.Parameters.AddWithValue("@IsEraEnd", block.IsEraEnd);
                    command.Parameters.AddWithValue("@Proposer", block.Proposer);
                    command.Parameters.AddWithValue("@TransactionCount", block.TransactionCount);

                    var n =command.ExecuteNonQuery();
                
                    if(n > 0)
                        _logger.LogInformation($"Added block to store for era {block.EraId} with height {block.Height}");
                    else
                        _logger.LogError($"Could not store block for era {block.EraId} with height {block.Height}");
                }
            }
        }
        catch (Exception e)
        {
            _logger.LogError($"Could not block step. Error: {e.Message}");
        }
    }

    public void AddTransaction(TransactionSummary transaction)
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                string query = @"INSERT INTO Transactions
                            (Id, Category, Version, Hash, BlockHash, Result, Initiator, Timestamp, MessageCount) 
                            VALUES 
                            (@Id, @Category, @Version, @Hash, @BlockHash, @Result, @Initiator, @Timestamp, @MessageCount)";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", transaction.EventId);
                    command.Parameters.AddWithValue("@Category", transaction.Category);
                    command.Parameters.AddWithValue("@Version", transaction.Version);
                    command.Parameters.AddWithValue("@Hash", transaction.Hash);
                    command.Parameters.AddWithValue("@BlockHash", transaction.BlockHash);
                    command.Parameters.AddWithValue("@Result", transaction.Result);
                    command.Parameters.AddWithValue("@Initiator", transaction.Initiator);
                    command.Parameters.AddWithValue("@Timestamp", DateTime.Parse(transaction.Timestamp));
                    command.Parameters.AddWithValue("@MessageCount", transaction.MessageCount);

                    var n =command.ExecuteNonQuery();
                
                    if(n > 0)
                        _logger.LogInformation($"Added transaction to store with hash {transaction.Hash}");
                    else
                        _logger.LogError($"Could not store transaction with hash {transaction.Hash}");
                }
            }
        }
        catch (Exception e)
        {
            _logger.LogError($"Could not store transaction. Error: {e.Message}");
        }
    }
    
    public async Task<PaginatedSummary<StepSummary>> GetSteps(int skip, int pageSize)
    {
        try
        {
            var paginatedData = new PaginatedSummary<StepSummary>();
            
            var data = new List<StepSummary>();
            
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = @"SELECT Id, EraId, RawJson 
                             FROM Steps
                             ORDER BY EraId DESC 
                             LIMIT @pageSize OFFSET @skip";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@skip", skip);
                    command.Parameters.AddWithValue("@pageSize", pageSize);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var summary = new StepSummary
                            {
                                EventId = Convert.ToUInt64(reader["Id"]),
                                EraId = Convert.ToUInt64(reader["EraId"]),
                                Json = Convert.ToString(reader["RawJson"]),
                            };
                            data.Add(summary);
                        }
                    }

                    paginatedData.Data = data;
                    
                    string countQuery = "SELECT COUNT(*) FROM Steps";

                    using (MySqlCommand countCommand = new MySqlCommand(countQuery, connection))
                    {
                        paginatedData.ItemCount = Convert.ToInt32(await countCommand.ExecuteScalarAsync());
                    }

                    paginatedData.PageCount = (int)Math.Ceiling((decimal)paginatedData.ItemCount / pageSize);
                }
            }

            return paginatedData;
        }
        catch (Exception e)
        {
            _logger.LogError("Cannot get steps. Error: " + e.Message);
            return new PaginatedSummary<StepSummary>()
            {
                Data = new List<StepSummary>(),
                ItemCount = 0,
                PageCount = 0,
            };
        }
    }

    public async Task<PaginatedSummary<BlockSummary>> GetBlocks(int skip, int pageSize)
    {

        try
        {
            var paginatedData = new PaginatedSummary<BlockSummary>();
            
            var data = new List<BlockSummary>();
            
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = @"SELECT Id, Hash, EraId, Height, ProtocolVersion, Timestamp, IsEraEnd, Proposer, TransactionCount 
                             FROM Blocks 
                             ORDER BY Timestamp DESC 
                             LIMIT @pageSize OFFSET @skip";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@skip", skip);
                    command.Parameters.AddWithValue("@pageSize", pageSize);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            BlockSummary summary = new BlockSummary
                            {
                                EventId = Convert.ToUInt64(reader["Id"]),
                                Hash = reader["Hash"].ToString(),
                                EraId = Convert.ToUInt64(reader["EraId"]),
                                Height = Convert.ToUInt64(reader["Height"]),
                                ProtocolVersion = reader["ProtocolVersion"].ToString(),
                                Timestamp = reader["Timestamp"].ToString(),
                                IsEraEnd = Convert.ToBoolean(reader["IsEraEnd"]),
                                Proposer = reader["Proposer"].ToString(),
                                TransactionCount = Convert.ToUInt32(reader["TransactionCount"])
                            };
                            data.Add(summary);
                        }
                    }

                    paginatedData.Data = data;
                    
                    string countQuery = "SELECT COUNT(*) FROM Blocks";

                    using (MySqlCommand countCommand = new MySqlCommand(countQuery, connection))
                    {
                        paginatedData.ItemCount = Convert.ToInt32(await countCommand.ExecuteScalarAsync());
                    }

                    paginatedData.PageCount = (int)Math.Ceiling((decimal)paginatedData.ItemCount / pageSize);
                }
            }

            return paginatedData;
        }
        catch (Exception e)
        {
            _logger.LogError("Cannot get blocks. Error: " + e.Message);
            return new PaginatedSummary<BlockSummary>()
            {
                Data = new List<BlockSummary>(),
                ItemCount = 0,
                PageCount = 0,
            };
        }
    }

    public async Task<PaginatedSummary<TransactionSummary>> GetTransactions(int skip, int pageSize)
    {
        try
        {
            var paginatedData = new PaginatedSummary<TransactionSummary>();
            
            var data = new List<TransactionSummary>();
            
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = @"SELECT Id, Category, Version, Hash, BlockHash, Result, Initiator, Timestamp, MessageCount 
                             FROM Transactions 
                             ORDER BY Timestamp DESC 
                             LIMIT @pageSize OFFSET @skip";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@skip", skip);
                    command.Parameters.AddWithValue("@pageSize", pageSize);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            TransactionSummary summary = new TransactionSummary
                            {
                                EventId = Convert.ToUInt64(reader["Id"]),
                                Category = reader["Category"].ToString(),
                                Version = reader["Version"].ToString(),
                                Hash = reader["Hash"].ToString(),
                                BlockHash = reader["BlockHash"].ToString(),
                                Result = reader["Result"].ToString(),
                                Initiator = reader["Initiator"].ToString(),
                                Timestamp = reader["Timestamp"].ToString(),
                                MessageCount = Convert.ToInt32(reader["MessageCount"])
                            };
                            data.Add(summary);
                        }
                    }

                    paginatedData.Data = data;
                    
                    string countQuery = "SELECT COUNT(*) FROM Transactions";

                    using (MySqlCommand countCommand = new MySqlCommand(countQuery, connection))
                    {
                        paginatedData.ItemCount = Convert.ToInt32(await countCommand.ExecuteScalarAsync());
                    }

                    paginatedData.PageCount = (int)Math.Ceiling((decimal)paginatedData.ItemCount / pageSize);
                }
            }

            return paginatedData;
        }
        catch (Exception e)
        {
            _logger.LogError("Cannot get transactions. Error: " + e.Message);
            return new PaginatedSummary<TransactionSummary>()
            {
                Data = new List<TransactionSummary>(),
                ItemCount = 0,
                PageCount = 0,
            };
        }
    }
    
    public async Task<StepSummary> GetStepByEraId(ulong eraId)
    {
        try
        {
            var data = new List<StepSummary>();
            
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = @"SELECT Id, EraId, RawJson 
                             FROM Steps
                             WHERE EraId = @eraId";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@eraId", eraId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var summary = new StepSummary
                            {
                                EventId = Convert.ToUInt64(reader["Id"]),
                                EraId = Convert.ToUInt64(reader["EraId"]),
                                Json = Convert.ToString(reader["RawJson"]),
                            };
                            data.Add(summary);
                        }
                    }
                }
            }

            return data.FirstOrDefault();
        }
        catch (Exception e)
        {
            _logger.LogError($"Cannot get step with eraId ${eraId}. Error: " + e.Message);
            return null;
        }
    }
    
    public async Task<ulong> GetHighestEventIdAsync()
    {
        ulong maxId = 0;

        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            await connection.OpenAsync();

            string query = @"
                SELECT GREATEST(
                    (SELECT IFNULL(MAX(Id), 0) FROM Steps),
                    (SELECT IFNULL(MAX(Id), 0) FROM Blocks),
                    (SELECT IFNULL(MAX(Id), 0) FROM Transactions)
                ) AS MaxId;
            ";

            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                var result = await command.ExecuteScalarAsync();
                maxId = Convert.ToUInt64(result);
            }
        }

        return maxId;
    }
    
    public ulong GetHighestEventId()
    {
        ulong maxId = 0;

        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            connection.Open();

            string query = @"
                SELECT GREATEST(
                    (SELECT IFNULL(MAX(Id), 0) FROM Steps),
                    (SELECT IFNULL(MAX(Id), 0) FROM Blocks),
                    (SELECT IFNULL(MAX(Id), 0) FROM Transactions)
                ) AS MaxId;
            ";

            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                var result = command.ExecuteScalar();
                maxId = Convert.ToUInt64(result);
            }
        }

        return maxId;
    }
}