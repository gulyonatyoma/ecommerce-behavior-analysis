-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE mart.product_month_price_band_activity (`month` Date, `product_id` Int64, `price_band` String, `product_views` UInt64, `product_carts` UInt64, `product_purchases` UInt64, `product_purchase_event_value` Nullable(Float64)) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY (month, product_id) SETTINGS index_granularity = 8192;
