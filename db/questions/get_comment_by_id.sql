SELECT
	(
	select sum(amount)
	from reputation
	where user_id = a.user_id
	) as reputation,
	username,
	a.user_id,
	(
	select sum(value)
	from vote
	where source_id = a.comment_id
		AND source_type = 'comment'
	) as votes
FROM comment as a
	JOIN users AS u ON a.user_id = u.auth_id
WHERE comment_id = $1