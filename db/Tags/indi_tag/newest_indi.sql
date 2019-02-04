SELECT
    q.question_id,
    q.question_title,
    substring(q.question_content, 0, 200) AS content,
    q.question_views,
    (extract(epoch FROM (now() - q.question_creation_timestamp)::interval)) AS question_creation,
    q.question_creation_timestamp AS question_created,
    qt.tag_name,
    t.description,
    (count(a.question_id)) AS answers,
    v.up_or_down,
    use.username,
    use.reputation,
    use.picture
FROM
    question q
    JOIN question_tag qt ON q.question_id = qt.question_id
    JOIN tag t ON qt.tag_name = t.tag_name
    LEFT JOIN answer a ON q.question_id = a.question_id
    LEFT JOIN vote v ON q.question_id = v.source_id
        AND v.source_type = 'question'
    JOIN users use ON q.user_id = use.auth_id
WHERE
    t.tag_name = 'javascript'
GROUP BY
    q.question_id,
    qt.tag_name,
    t.description,
    v.up_or_down,
    use.username,
    use.reputation,
    use.picture
ORDER BY
    (now() - q.question_creation_timestamp)
