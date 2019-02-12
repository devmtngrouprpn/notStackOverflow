SELECT
    *
FROM edit 
WHERE 
    source_id = $1
    and source_type = $2
    and edit_accepted = TRUE
ORDER BY edit_date;