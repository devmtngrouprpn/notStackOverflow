SELECT
    count(bounty_id) AS featured_total
FROM
    bounty
WHERE
    bounty_winner IS NULL and AGE(now(), bounty_creation_timestamp) < interval
'7 days'
