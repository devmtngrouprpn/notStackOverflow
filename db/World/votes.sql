SELECT
    q.question_id,
    q.question_title,
    substring(q.question_content, 0, 200) AS content,
    q.question_views,
    (now() - q.question_creation_timestamp) AS time,
    use.username,
    use.reputation,
    use.auth_id,
    sum(v.up_or_down) / 2 AS votes,
    (count(a.question_id) / 2) AS answers,
    t.tag_name
FROM
    question q
    JOIN users use ON q.user_id = use.auth_id
    LEFT JOIN answer a ON q.question_id = a.question_id
    JOIN vote v ON use.auth_id = v.user_id
    JOIN question_tag t ON q.question_id = t.question_id
GROUP BY
    v.source_type,
    use.username,
    use.reputation,
    t.tag_name,
    q.question_id,
    use.auth_id
ORDER BY
    votes DESC
LIMIT 100;

