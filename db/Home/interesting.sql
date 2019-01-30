select
    q.question_id,
    sum(v.up_or_down) as votes,
    v.source_type,
    (count(a.question_id) / 2) as answers,
    q.question_title,
    q.question_creation_timestamp,
    q.question_views,
    use.username,
    use.reputation,
    t.tag_name
from
    question q
    join users use on q.user_id = use.auth_id
    left join answer a on q.question_id = a.question_id
    join vote v on use.auth_id = v.user_id
    join question_tag t on q.question_id = t.question_id --	where q.question_id = 4
group by
    v.source_type,
    use.username,
    use.reputation,
    t.tag_name,
    q.question_id
order by
    q.question_creation_timestamp
limit
    100;