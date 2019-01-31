SELECT
    count(bounty.bounty_id) / 2 AS featured_total
FROM
    bounty
WHERE
    bounty.bounty_active = TRUE
