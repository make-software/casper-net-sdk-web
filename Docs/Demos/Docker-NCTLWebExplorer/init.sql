-- init.sql
CREATE TABLE IF NOT EXISTS Steps (
     Id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
     EraId BIGINT UNSIGNED NOT NULL,
     RawJson JSON NOT NULL
);

CREATE INDEX step_eraid_index
    ON Steps (EraId DESC);

CREATE TABLE IF NOT EXISTS Blocks (
                                      Id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
                                      Hash VARCHAR(64) NOT NULL,
                                      Height BIGINT UNSIGNED NOT NULL,
                                      Proposer VARCHAR(128) NOT NULL,
                                      EraId BIGINT UNSIGNED NOT NULL,
                                      IsEraEnd BOOLEAN NOT NULL,
                                      TransactionCount INT UNSIGNED NOT NULL,
                                      ProtocolVersion VARCHAR(16) NOT NULL,
                                      Timestamp DATETIME NOT NULL
);

CREATE INDEX block_timestamp_index
    ON Blocks (Timestamp DESC);

CREATE TABLE IF NOT EXISTS Transactions (
    Id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    Hash VARCHAR(64) NOT NULL,
    Category VARCHAR(16) NOT NULL,
    Version VARCHAR(16) NOT NULL,
    BlockHash VARCHAR(64) NOT NULL,
    Result VARCHAR(16) NOT NULL,
    Initiator VARCHAR(128) NOT NULL,
    Timestamp DATETIME NOT NULL,
    MessageCount INT NOT NULL
);

CREATE INDEX transaction_timestamp_index
    ON Transactions (Timestamp DESC);
