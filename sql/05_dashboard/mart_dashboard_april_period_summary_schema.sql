-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE mart.dashboard_april_period_summary (`period_order` UInt8, `period` String, `eligible_pairs` UInt64, `converted_pairs` UInt64, `trusted_view_purchase_1d_cr_pct` Nullable(Float64)) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY period_order SETTINGS index_granularity = 8192;
