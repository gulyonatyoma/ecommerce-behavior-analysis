-- Schema snapshot exported from ClickHouse Cloud system.tables.
-- This file documents the table structure only.
-- It does NOT reconstruct the original INSERT/SELECT transformation used to populate the table.
-- SharedMergeTree is preserved exactly as reported by ClickHouse Cloud.

CREATE TABLE qa.data_quality_rules (`rule_id` String, `issue_type` String, `affected_event_type` Nullable(String), `period_start` Nullable(DateTime64(3)), `period_end` Nullable(DateTime64(3)), `evidence` String, `cleaning_action` String, `analytic_impact` String, `status` String, `severity` String) ENGINE = SharedMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}') ORDER BY rule_id SETTINGS index_granularity = 8192;
