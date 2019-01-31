SELECT
    t.tag_name AS name,
    t.description,
    t.tag_views AS views,
    t.watchers,
    count(qt.tag_name) AS questions_with_tag
FROM
    tag t
    LEFT JOIN question_tag qt ON t.tag_name = qt.tag_name
GROUP BY
    qt.tag_name,
    t.tag_name
LIMIT 28;

