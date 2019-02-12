SELECT
    *
FROM edit 
WHERE 
    source_id = 4
    and source_type = 'question'
	and edit_accepted = false
ORDER BY edit_date asc a
limit 1; 