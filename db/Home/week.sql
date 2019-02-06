SELECT
	(
	select array_agg(tag_name)
	from question_tag
	where question_id = q.question_id
	) as tags,
	(
	select count(answer_id)
	from answer
	where question_id = q.question_id
	) as answers,
	(
	select sum(amount)
	from reputation
	where user_id = q.user_id
	) as reputation,
	(
	select sum(value)
	from vote
	where source_id = q.question_id AND source_type = 'question'
	) as votes,
	(
	select
		bool_or(
		CASE 
			WHEN answer_accepted = TRUE 
				THEN TRUE
			WHEN answer_accepted = FALSE 
				THEN FALSE
		END
		)
	from answer
	where question_id = q.question_id
	) as answer_accepted,
	u.username,
	u.picture,
	substring(regexp_replace(q.question_content, '<[^<]+>', '', 'g'), '^[^\n\r]{0,200}\M') || ' ...' AS content,
	question_title,
	question_views,
	question_creation_timestamp,
	(
	select max(edit_date)
	from edit
	where source_id = q.question_id
		AND source_type = 'question'
	) as last_edit,
	question_id
FROM question AS q
	JOIN users AS u ON u.auth_id = q.user_id
WHERE now() - question_creation_timestamp < interval
'1 week'
ORDER BY
((
	select count(answer_id)
from answer
where question_id = q.question_id
	)
* 100 +
(
	select count(value)
from vote
where source_id = q.question_id AND source_type = 'question'
	)
* 20 + question_views) desc;