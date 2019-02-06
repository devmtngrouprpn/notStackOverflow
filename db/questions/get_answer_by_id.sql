SELECT 
	(
	select sum(amount)
	from reputation
	where user_id = a.user_id
	) as reputation,
	username,
	a.user_id,
	(
	select e.edit_id
	from edit as e
	where source_id = a.answer_id
		AND source_type = 'answer'
	order by edit_date desc
	limit 1
	) as last_edit,
	(
	select sum(value)
	from vote
	where source_id = a.answer_id
		AND source_type = 'answer'
	) as votes,
	(
	select array_agg(comment_id)
	from comment
	where source_id = a.answer_id
		AND source_type = 'answer'
	) as comments
FROM answer as a
    JOIN users AS u ON a.user_id = u.auth_id
WHERE answer_id = $1