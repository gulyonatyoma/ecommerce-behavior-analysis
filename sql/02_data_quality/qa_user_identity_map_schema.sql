-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE qa.user_identity_map (`original_user_id` Int64, `canonical_user_id` Int64, `identity_group_size` UInt32) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY original_user_id SETTINGS index_granularity = 8192;
