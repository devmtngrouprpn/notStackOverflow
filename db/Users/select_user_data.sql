SELECT
	(
		select count(answer_id)
		from answer
		where user_id = u.auth_id
	) as answers,
	(
		select count(question_id)
		from question
		where user_id = u.auth_id
	) as questions,
	(
		select sum(question_views)
		from question as q
		where (user_id = u.auth_id 
				OR (u.auth_id IN (select user_id from answer where question_id = q.question_id)))
	) as people_reached,
	(
		select sum(amount)
		from reputation
		where user_id = u.auth_id
	) as reputation,
	u.*
FROM
	users as u
WHERE 
	auth_id = $1;
	