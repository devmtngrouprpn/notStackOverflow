select q.question_id, sum(v.up_or_down) as votes, v.source_type, (count(a.question_id)/2) as answers, q.question_title,(now() - b.bounty_creation_timestamp),q.question_views, use.username, use.reputation ,t.tag_name, b.bounty_value 
	from question q
	join users use on q.user_id = use.auth_id
	left join answer a on q.question_id = a.question_id
	join vote v on use.auth_id = v.user_id
	join question_tag t on q.question_id = t.question_id
	left join bounty b on q.question_id = b.question_id
	where q.question_id = b.question_id
	group by v.source_type, use.username, use.reputation, t.tag_name, q.question_id, b.bounty_value, b.bounty_creation_timestamp
		order by (((now() - b.bounty_creation_timestamp)/q.question_views)* (count(a.question_id)/2)* b.bounty_value)
		limit 100;