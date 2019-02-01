SELECT
    t.tag_name AS name,
    count(qt.tag_name) AS question_tag
FROM
    tag t
    LEFT JOIN question_tag qt ON t.tag_name = qt.tag_name
    LEFT JOIN question q ON qt.question_id = q.question_id
WHERE (
    CASE WHEN ((extract(day FROM now() - q.question_creation_timestamp))) < 1 THEN
        TRUE
    END) IS TRUE
GROUP BY
    qt.tag_name,
    t.tag_name
LIMIT 28;

