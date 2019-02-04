SELECT
    count(question.question_id) AS question_total
FROM
    question
WHERE
    question.question_deleted = FALSE
