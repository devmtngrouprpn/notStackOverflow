SELECT
    count(q.question_id) AS question_total
FROM
    question q
    LEFT JOIN answer a ON q.question_id = a.question_id;

