-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE clean.events (`event_time` DateTime64(3), `event_type` Nullable(String), `product_id` Nullable(Int64), `category_id` Nullable(Int64), `category_code` Nullable(String), `brand` Nullable(String), `price` Nullable(Float64), `user_id` Int64, `canonical_user_id` Int64, `identity_group_size` UInt32, `user_session` Nullable(String), `is_identity_stitched` UInt8, `is_user_id_changed` UInt8, `is_purchase_deduplicated` UInt8, `is_feb_purchase_dup_incident` UInt8, `is_feb_view_cart_gap` UInt8, `is_apr_purchase_gap` UInt8, `is_apr_general_logging_gap` UInt8) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY (event_time, canonical_user_id) SETTINGS index_granularity = 8192;
