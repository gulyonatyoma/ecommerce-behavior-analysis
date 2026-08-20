-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE mart.monthly_funnel_trusted (`month` Date, `viewed_pairs` UInt64, `view_cart_eligible` UInt64, `view_cart_converted` UInt64, `view_purchase_eligible` UInt64, `view_purchase_converted` UInt64) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY month SETTINGS index_granularity = 8192;
