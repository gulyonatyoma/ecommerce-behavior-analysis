-- Reference implementation of the trusted 1-day funnel aggregation.
-- The original production INSERT/CTAS statement is no longer available in system.query_log.
-- This query documents the project's trusted-eligibility logic without modifying mart tables.
--
-- Input assumption:
-- mart.user_product_funnel_daily contains first-view cohorts and 1-day conversion counts.
-- A cohort is excluded when its 1-day observation window intersects a confirmed logging incident
-- that compromises the events required by the metric.

WITH
    toDate('2019-11-14') AS nov_gap1_start_date,
    toDate('2019-11-16') AS nov_gap1_end_date,
    toDate('2019-11-16') AS nov_gap2_start_date,
    toDate('2019-11-17') AS nov_gap2_end_date,
    toDate('2020-02-27') AS feb_view_cart_gap_start_date,
    toDate('2020-02-28') AS feb_view_cart_gap_end_date,
    toDate('2020-04-19') AS apr_purchase_gap_start_date,
    toDate('2020-04-22') AS apr_purchase_gap_end_date,
    toDate('2020-04-19') AS apr_general_gap_date,

    daily AS
    (
        SELECT
            first_view_date,
            eligible_1d_pairs,
            view_cart_1d_pairs,
            view_purchase_1d_pairs,

            -- View -> Cart needs reliable view/cart logging.
            toUInt8(
                NOT (
                    first_view_date <= feb_view_cart_gap_end_date
                    AND first_view_date + INTERVAL 1 DAY >= feb_view_cart_gap_start_date
                )
                AND NOT (
                    first_view_date <= apr_general_gap_date
                    AND first_view_date + INTERVAL 1 DAY >= apr_general_gap_date
                )
            ) AS trusted_view_cart_1d,

            -- View -> Purchase needs reliable cohort observation plus reliable purchase logging.
            toUInt8(
                NOT (
                    first_view_date <= nov_gap1_end_date
                    AND first_view_date + INTERVAL 1 DAY >= nov_gap1_start_date
                )
                AND NOT (
                    first_view_date <= nov_gap2_end_date
                    AND first_view_date + INTERVAL 1 DAY >= nov_gap2_start_date
                )
                AND NOT (
                    first_view_date <= feb_view_cart_gap_end_date
                    AND first_view_date + INTERVAL 1 DAY >= feb_view_cart_gap_start_date
                )
                AND NOT (
                    first_view_date <= apr_purchase_gap_end_date
                    AND first_view_date + INTERVAL 1 DAY >= apr_purchase_gap_start_date
                )
            ) AS trusted_view_purchase_1d

        FROM mart.user_product_funnel_daily
    )

SELECT
    toStartOfMonth(first_view_date) AS month,
    sum(eligible_1d_pairs) AS viewed_pairs,

    sumIf(eligible_1d_pairs, trusted_view_cart_1d = 1) AS view_cart_eligible,
    sumIf(view_cart_1d_pairs, trusted_view_cart_1d = 1) AS view_cart_converted,

    sumIf(eligible_1d_pairs, trusted_view_purchase_1d = 1) AS view_purchase_eligible,
    sumIf(view_purchase_1d_pairs, trusted_view_purchase_1d = 1) AS view_purchase_converted

FROM daily
GROUP BY month
ORDER BY month;
