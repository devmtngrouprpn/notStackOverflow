SELECT
    q.question_id,
    q.question_title,
    substring(q.question_content, 0, 200) AS content,
    q.question_views AS views,
    use.username,
    use.reputation,
    use.auth_id,
    use.picture,
    sum(v.up_or_down) / 2 AS votes,
    (count(a.question_id) / 2) AS answers,
    t.tag_name,
    (extract(epoch FROM (now() - q.question_creation_timestamp)::interval)) AS question_creation,
    q.question_creation_timestamp AS question_created,
    (extract(epoch FROM (now() - q.question_last_edit)::interval)) AS question_edit,
    q.question_last_edit AS question_edit_time,
    CASE WHEN a.answer_accepted = TRUE THEN
        TRUE
    END AS accepted
FROM
    question q
    JOIN users use ON q.user_id = use.auth_id
    LEFT JOIN answer a ON q.question_id = a.question_id
    JOIN vote v ON use.auth_id = v.user_id
    JOIN question_tag t ON q.question_id = t.question_id
WHERE (
    CASE WHEN ((extract(day FROM now() - q.question_creation_timestamp))) >= 1 THEN
        TRUE
    END) IS TRUE
GROUP BY
    v.source_type,
    use.username,
    use.reputation,
    t.tag_name,
    q.question_id,
    use.auth_id,
    a.answer_accepted
ORDER BY
    (((sum(v.up_or_down) / 2) * 10) + ((count(a.question_id) / 2) * 100) + (q.question_views) / (extract(day FROM now() - q.question_creation_timestamp)))
    DESC
LIMIT 100;

