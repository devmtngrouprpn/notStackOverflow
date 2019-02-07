SELECT
	q.*,
	(
    select sum(amount)
	from reputation
	where user_id = q.user_id
    ) as reputation,
	username,
	q.user_id,
	(
    select e.edit_id
	from edit as e
	where source_id = q.question_id
		AND source_type = 'question'
	order by edit_date desc
    LIMIT 1
    ) as last_edit,
	(
    select array_agg(answer_id)
	from answer
	where question_id = q.question_id
    ) as answers,
	(
    select sum(value)
	from vote
	where source_id = q.question_id
		AND source_type = 'question'
    ) as votes,
	(
    select array_agg(tag_name)
	from question_tag
	where question_id = q.question_id
    ) as tags,
	(
    select array_agg(comment_id)
	from comment
	where source_id = q.question_id
		AND source_type = 'question'
    ) as comments,
	bounty_value,
	bounty_creation_timestamp,
	b.user_id as bounty_creator_id,
	(
	select username
	from users
	where auth_id = b.user_id
	) as bounty_creator_username
FROM question as q
	JOIN users AS u ON q.user_id = u.auth_id
	LEFT JOIN bounty as b ON b.question_id = q.question_id
WHERE q.question_id = 4 AND bounty_winner IS NULL AND now() - bounty_creation_timestamp < interval
'7 days';



