-- Reference implementation of mart.dashboard_monthly_main.
-- This is a lightweight presentation-layer join over already aggregated monthly marts.
-- It is SELECT-only and safe to review without modifying the production table.

SELECT
    o.month,

    o.active_users,
    o.viewing_users,
    o.cart_users,
    o.purchasing_users,
    o.purchasing_user_share_pct,
    o.active_days_per_user,
    o.events_per_active_user,

    o.active_products,
    o.viewed_products,
    o.carted_products,
    o.purchased_products,

    o.view_cart_eligible,
    o.view_cart_converted,
    o.trusted_view_cart_1d_cr_pct,
    o.view_purchase_eligible,
    o.view_purchase_converted,
    o.trusted_view_purchase_1d_cr_pct,
    o.funnel_completion_proxy_pct,

    o.total_views,
    o.total_carts,
    o.observed_purchase_events,
    o.observed_purchase_event_value,

    c.product_value_top1_pct,
    c.product_value_top10_pct,
    c.product_events_top1_pct,
    c.product_events_top10_pct,

    c.purchasing_brands,
    c.top1_brand_value_share_pct,
    c.top3_brand_value_share_pct,
    c.top10_brand_value_share_pct,
    c.missing_brand_view_share_pct,
    c.missing_brand_purchase_share_pct,

    c.low_price_product_share_pct,
    c.premium_product_share_pct,
    c.premium_view_share_pct,
    c.premium_purchase_event_share_pct,
    c.premium_purchase_event_value_share_pct,
    c.gt400_purchase_event_value_share_pct,

    c.assortment_retained_share_pct,
    c.assortment_new_vs_previous_share_pct,

    o.has_nov_purchase_gap,
    o.has_feb_view_cart_gap,
    o.has_apr_purchase_gap,
    o.observed_purchase_totals_incomplete,

    c.purchase_structure_has_gap,
    c.assortment_has_view_gap

FROM mart.dashboard_monthly_overview AS o
LEFT JOIN mart.dashboard_monthly_commercial_structure AS c
    USING (month)
ORDER BY o.month;
