SELECT
    count(question_id) as total
FROM
    question
WHERE
    question_content LIKE '%%' || $1 || '%%';