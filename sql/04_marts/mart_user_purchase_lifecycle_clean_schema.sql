-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE mart.user_purchase_lifecycle_clean (`canonical_user_id` Int64, `first_observed_purchase_date` Date, `second_observed_purchase_date` Date, `last_observed_purchase_date` Date, `observed_purchase_days` UInt64, `total_purchase_events` UInt64, `total_purchase_event_value` Float64) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY canonical_user_id SETTINGS index_granularity = 8192;
