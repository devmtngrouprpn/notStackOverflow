SELECT
    vote_id,
    value
FROM vote
WHERE user_id = $1 and source_id = $2 and source_type = $3;