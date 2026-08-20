-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE qa.session_user_conflicts (`user_session` String, `user_ids` Array(Int64), `user_count` UInt64, `events` UInt64) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY user_session SETTINGS index_granularity = 8192;
