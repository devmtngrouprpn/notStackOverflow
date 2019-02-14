SELECT
	(
	select sum(amount)
	from reputation
	where user_id = c.user_id
	) as reputation,
	username,
	c.user_id,
	comment_id,
	source_id,
	source_type,
	(
	select sum(value)
	from vote
	where source_id = c.comment_id
		AND source_type = 'comment'
	) as votes,
	comment_creation_timestamp,
	content
FROM comment as c
	JOIN users AS u ON c.user_id = u.auth_id
WHERE comment_id = $1