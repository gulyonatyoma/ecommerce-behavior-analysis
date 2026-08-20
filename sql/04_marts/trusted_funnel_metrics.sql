-- Trusted monthly funnel rates.
-- This query derives presentation metrics only from the already-built trusted mart.
-- It does not attempt to reconstruct the historical eligibility transformation.

SELECT
    month,
    viewed_pairs,
    view_cart_eligible,
    view_cart_converted,
    if(
        view_cart_eligible = 0,
        NULL,
        100.0 * view_cart_converted / view_cart_eligible
    ) AS trusted_view_cart_1d_cr_pct,
    view_purchase_eligible,
    view_purchase_converted,
    if(
        view_purchase_eligible = 0,
        NULL,
        100.0 * view_purchase_converted / view_purchase_eligible
    ) AS trusted_view_purchase_1d_cr_pct
FROM mart.monthly_funnel_trusted
ORDER BY month;
