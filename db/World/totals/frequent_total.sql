SELECT
    count(q.question_id) AS question_total
FROM
    question q
WHERE (
    CASE WHEN ((extract(day FROM now() - q.question_creation_timestamp))) <= 1 THEN
        TRUE
    END) IS TRUE
