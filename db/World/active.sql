SELECT
    q.question_id,
    q.question_title,
    substring(q.question_content, 0, 200) AS content,
    q.question_views AS views,
    (extract(epoch FROM (now() - q.question_creation_timestamp)::interval)) AS question_creation,
    q.question_creation_timestamp AS question_created,
    (extract(epoch FROM (now() - q.question_last_edit)::interval)) AS question_edit,
    q.question_last_edit AS question_edit_time,
    CASE WHEN a.answer_accepted = TRUE THEN
        TRUE
    END AS accepted,
    use.username,
    sum(r.amount) as reputation,
    use.auth_id,
    use.picture,
    sum(v.up_or_down) / 2 AS votes,
    (count(a.question_id)) AS answers,
    t.tag_name
FROM
    question q
    JOIN users use ON q.user_id = use.auth_id
    JOIN reputation AS r ON r.user_id = use.auth_id
    LEFT JOIN answer a ON q.question_id = a.question_id
    JOIN vote v ON use.auth_id = v.user_id
        AND v.source_type = 'question'
    JOIN question_tag t ON q.question_id = t.question_id
WHERE (
    CASE WHEN ((extract(day FROM now() - q.question_last_edit))) >= 7 THEN
        TRUE
    END) IS TRUE
GROUP BY
    v.source_type,
    use.username,
    t.tag_name,
    q.question_id,
    use.auth_id,
    a.answer_creation_timestamp,
    a.answer_accepted
ORDER BY
    ((extract(milliseconds FROM now() - q.question_last_edit)) / (extract(milliseconds FROM now() - a.answer_creation_timestamp)))
LIMIT 100;

