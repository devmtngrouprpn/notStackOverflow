SELECT
    count(bounty_id) AS featured_total
FROM
    bounty as b
WHERE bounty_winner IS NULL AND AGE(now(), bounty_creation_timestamp) < interval
'7 days'
    and $1 = ANY (select unnest(array_agg(tag_name)) from question as q2 join question_tag as qt ON qt.question_id = q2.question_id where q2.question_id = b.question_id)

    
