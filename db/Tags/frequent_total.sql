SELECT
    count(q.question_id) AS question_total
FROM
    question q
WHERE (
    CASE WHEN ((extract(day FROM now() - q.question_creation_timestamp))) <= 1 THEN
        TRUE
    END) IS TRUE
    and $1 = ANY (select unnest(array_agg(tag_name)) from question as q2 join question_tag as qt ON qt.question_id = q2.question_id where q2.question_id = q.question_id)
