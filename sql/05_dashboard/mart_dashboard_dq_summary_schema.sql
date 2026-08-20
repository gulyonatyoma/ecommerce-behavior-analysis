-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE mart.dashboard_dq_summary (`snapshot_key` String, `total_rules` UInt64, `critical_rules` UInt64, `high_rules` UInt64, `time_bounded_incidents` UInt64, `corrected_in_clean_rules` UInt64, `trusted_metric_exclusion_rules` UInt64, `preserved_limitation_rules` UInt64, `diagnostic_only_rules` UInt64) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY snapshot_key SETTINGS index_granularity = 8192;
