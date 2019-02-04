SELECT
    count(bounty.bounty_id) AS featured_total
FROM
    bounty
WHERE
    bounty.bounty_active = TRUE
