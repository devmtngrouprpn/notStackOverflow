SELECT
	count(q.question_id)
FROM
    question AS q
WHERE
(
    select count(answer_id)
from answer
where question_id = q.question_id)
= 0
    and $1 = ANY (select unnest(array_agg(tag_name)) from question as q2 join question_tag as qt ON qt.question_id = q2.question_id where q2.question_id = q.question_id)

