SELECT
    q.question_id,
    sum(v.up_or_down) / 2 AS votes,
    v.source_type,
    (count(a.question_id) / 2) AS answers,
    q.question_title,
    (now() - q.question_creation_timestamp) AS time,
    q.question_views,
    use.username,
    use.reputation,
    t.tag_name AS tags,
    use.auth_id
FROM
    question q
    JOIN users use ON q.user_id = use.auth_id
    LEFT JOIN answer a ON q.question_id = a.question_id
    JOIN vote v ON use.auth_id = v.user_id
    JOIN question_tag t ON q.question_id = t.question_id
WHERE (
    CASE WHEN ((extract(day FROM now() - q.question_creation_timestamp))) < 7 THEN
        TRUE
    END) IS TRUE
GROUP BY
    v.source_type,
    use.username,
    use.reputation,
    t.tag_name,
    q.question_id,
    use.auth_id
ORDER BY
    ((sum(v.up_or_down) / 2) / q.question_views) * (extract(day FROM now() - q.question_creation_timestamp))
    DESC
LIMIT 100;

