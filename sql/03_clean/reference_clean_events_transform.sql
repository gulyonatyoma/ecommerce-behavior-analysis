-- Reference implementation reconstructed from the documented project methodology.
-- This is intentionally a SELECT-only transformation: it does not overwrite clean.events.
-- The exact production CREATE/INSERT statement is no longer present in system.query_log.
--
-- Semantics preserved:
--   * exact purchase deduplication ONLY inside the confirmed February incident;
--   * raw user_id is preserved;
--   * canonical_user_id is applied from qa.user_identity_map;
--   * NULL/empty sessions are not stitched by this query;
--   * confirmed DQ periods are flagged, not imputed.

WITH
    toDateTime64('2020-02-10 07:23:00.000', 3) AS feb_dup_start,
    toDateTime64('2020-02-18 06:00:00.000', 3) AS feb_dup_end,
    toDateTime64('2020-02-27 01:00:00.000', 3) AS feb_vc_gap_start,
    toDateTime64('2020-02-28 06:00:00.000', 3) AS feb_vc_gap_end,
    toDateTime64('2020-04-19 18:51:12.000', 3) AS apr_purchase_gap_last_healthy,
    toDateTime64('2020-04-22 01:08:20.000', 3) AS apr_purchase_gap_recovery,
    toDateTime64('2020-04-19 18:50:00.000', 3) AS apr_general_gap_start,
    toDateTime64('2020-04-19 22:00:00.000', 3) AS apr_general_gap_end,

    event_stream AS
    (
        -- All events outside the confirmed purchase-duplicate incident are preserved as observed.
        SELECT
            event_time,
            event_type,
            product_id,
            category_id,
            category_code,
            brand,
            price,
            user_id,
            user_session,
            toUInt8(0) AS is_purchase_deduplicated
        FROM raw.events
        WHERE NOT (
            event_type = 'purchase'
            AND event_time >= feb_dup_start
            AND event_time < feb_dup_end
        )

        UNION ALL

        -- Inside the confirmed incident, one row is kept per exact event tuple.
        -- count() > 1 marks surviving rows whose exact duplicate group was collapsed.
        SELECT
            event_time,
            event_type,
            product_id,
            category_id,
            category_code,
            brand,
            price,
            user_id,
            user_session,
            toUInt8(count() > 1) AS is_purchase_deduplicated
        FROM raw.events
        WHERE
            event_type = 'purchase'
            AND event_time >= feb_dup_start
            AND event_time < feb_dup_end
        GROUP BY
            event_time,
            event_type,
            product_id,
            category_id,
            category_code,
            brand,
            price,
            user_id,
            user_session
    )

SELECT
    e.event_time,
    e.event_type,
    e.product_id,
    e.category_id,
    e.category_code,
    e.brand,
    e.price,
    e.user_id,
    coalesce(m.canonical_user_id, e.user_id) AS canonical_user_id,
    coalesce(m.identity_group_size, toUInt32(1)) AS identity_group_size,
    e.user_session,

    toUInt8(m.original_user_id IS NOT NULL) AS is_identity_stitched,
    toUInt8(coalesce(m.canonical_user_id, e.user_id) != e.user_id) AS is_user_id_changed,
    e.is_purchase_deduplicated,

    toUInt8(
        e.event_type = 'purchase'
        AND e.event_time >= feb_dup_start
        AND e.event_time < feb_dup_end
    ) AS is_feb_purchase_dup_incident,

    toUInt8(
        e.event_type IN ('view', 'cart')
        AND e.event_time >= feb_vc_gap_start
        AND e.event_time < feb_vc_gap_end
    ) AS is_feb_view_cart_gap,

    toUInt8(
        e.event_type = 'purchase'
        AND e.event_time > apr_purchase_gap_last_healthy
        AND e.event_time < apr_purchase_gap_recovery
    ) AS is_apr_purchase_gap,

    toUInt8(
        e.event_time >= apr_general_gap_start
        AND e.event_time < apr_general_gap_end
    ) AS is_apr_general_logging_gap

FROM event_stream AS e
LEFT JOIN qa.user_identity_map AS m
    ON e.user_id = m.original_user_id;
