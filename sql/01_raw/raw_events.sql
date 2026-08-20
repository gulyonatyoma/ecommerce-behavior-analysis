-- Raw event-level table used by the project.
-- Portable MergeTree form documented from the project schema.

CREATE TABLE raw.events
(
    event_time DateTime64(3),
    event_type Nullable(String),
    product_id Nullable(Int64),
    category_id Nullable(Int64),
    category_code Nullable(String),
    brand Nullable(String),
    price Nullable(Float64),
    user_id Int64,
    user_session Nullable(String)
)
ENGINE = MergeTree
ORDER BY (event_time, user_id);
