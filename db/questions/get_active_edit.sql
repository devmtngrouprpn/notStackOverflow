SELECT
    e.*,
    u.username
FROM edit as e
    JOIN users as u ON u.auth_id = e.user_id
WHERE 
    source_id = $1
    and source_type = $2
	and edit_accepted = false
ORDER BY edit_date asc 
limit 1; 