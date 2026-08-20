-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE qa.exact_duplicate_groups (`event_type` String, `event_time` DateTime64(3), `product_id` Nullable(Int64), `category_id` Nullable(Int64), `category_code` Nullable(String), `brand` Nullable(String), `price` Nullable(Float64), `user_id` Int64, `user_session` Nullable(String), `multiplicity` UInt64) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY (event_type, event_time) SETTINGS index_granularity = 8192;
