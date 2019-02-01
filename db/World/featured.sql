SELECT
    q.question_id,
    sum(v.up_or_down) / 2 AS votes,
    v.source_type,
    (count(a.question_id) / 2) AS answers,
    q.question_title,
    (extract(day FROM now() - q.question_creation_timestamp)) AS time,
    substring(q.question_content, 0, 200) AS content,
    q.question_views,
    use.username,
    use.reputation,
    t.tag_name,
    b.bounty_value,
    use.auth_id,
    q.question_views
FROM
    question q
    JOIN users use ON q.user_id = use.auth_id
    LEFT JOIN answer a ON q.question_id = a.question_id
    JOIN vote v ON use.auth_id = v.user_id
    JOIN question_tag t ON q.question_id = t.question_id
    LEFT JOIN bounty b ON q.question_id = b.question_id
WHERE
    q.question_id = b.question_id
GROUP BY
    v.source_type,
    use.username,
    use.reputation,
    t.tag_name,
    q.question_id,
    b.bounty_value,
    b.bounty_creation_timestamp,
    use.auth_id
ORDER BY
    ((((extract(day FROM now() - q.question_creation_timestamp)) / sum(v.up_or_down) / 2) * q.question_views) * (count(a.question_id) / 2) / b.bounty_value)
LIMIT 100;

