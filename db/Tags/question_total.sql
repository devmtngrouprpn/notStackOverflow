SELECT
    count(q.question_id) AS question_total
FROM
    question as q
where $1 = ANY (select unnest(array_agg(tag_name)) from question as q2 join question_tag as qt ON qt.question_id = q2.question_id where q2.question_id = q.question_id)