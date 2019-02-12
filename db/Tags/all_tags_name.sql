SELECT
	count(qt.question_id) as total,
	t.tag_name,
	substring(description, '^[^\n\r]{0,150}\M') as description,
	(
			select count(qt2.question_id)
		from question_tag as qt2
			JOIN question as q ON q.question_id = qt2.question_id
		where tag_name = t.tag_name
			AND AGE(now() ,q.question_creation_timestamp) < interval '1 day'
	) as day,
	(
			select count(qt2.question_id)
		from question_tag as qt2
			JOIN question as q ON q.question_id = qt2.question_id
		where tag_name = t.tag_name
			AND AGE(now() ,q.question_creation_timestamp) < interval '1 week'
	) as week,
	(
			select count(qt2.question_id)
		from question_tag as qt2
			JOIN question as q ON q.question_id = qt2.question_id
		where tag_name = t.tag_name
			AND AGE(now() ,q.question_creation_timestamp) < interval '1 month'
	) as month,
	(
			select count(qt2.question_id)
		from question_tag as qt2
			JOIN question as q ON q.question_id = qt2.question_id
		where tag_name = t.tag_name
			AND AGE(now() ,q.question_creation_timestamp) < interval '1 year'
	) as year
FROM tag as t
	LEFT JOIN question_tag as qt ON qt.tag_name = t.tag_name
GROUP BY t.tag_name
ORDER BY t.tag_name;