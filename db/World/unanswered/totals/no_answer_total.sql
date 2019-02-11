SELECT
	count(q.question_id)
FROM
    question AS q
WHERE
(select count(answer_id)
from answer
where question_id = q.question_id)
= 0

