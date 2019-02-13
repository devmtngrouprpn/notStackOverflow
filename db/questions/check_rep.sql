SELECT 
    *
FROM reputation
WHERE source_type = $1 and source_id = $2 and user_id = $3;