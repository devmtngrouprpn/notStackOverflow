SELECT
    (
        SELECT
        sum(amount)
    FROM
        reputation
    WHERE
            user_id = q.user_id) AS reputation, (
            SELECT
        array_agg(tag_name)
    FROM
        question_tag
    WHERE
                question_id = q.question_id) AS tags, (
                SELECT
        sum(value)
    FROM
        vote
    WHERE
                    source_id = q.question_id
        AND source_type = 'question') AS votes, (
                    SELECT
        count(answer_id)
    FROM
        answer
    WHERE
                        question_id = q.question_id) AS answers, (
                        SELECT
        bool_or(
                                CASE WHEN answer_accepted = TRUE THEN
                                    TRUE
                                WHEN answer_accepted = FALSE THEN
                                    FALSE
                                END)
    FROM
        answer
    WHERE
                            question_id = q.question_id) AS answer_accepted, u.username, u.picture, substring(regexp_replace(q.question_content, '<[^<]+>', '', 'g'), '^[^\n\r]{0,200}\M') || ' ...' AS content,
    question_title,
    question_views,
    question_creation_timestamp,
    (
	select max(edit_date)
    from edit
    where source_id = q.question_id
        AND source_type = 'question'
	) as last_edit,
    q.question_id,
    q.user_id
FROM question AS q
    JOIN users AS u ON u.auth_id = q.user_id
WHERE
((extract
(day FROM now
() - q.question_creation_timestamp))) <= 7
ORDER BY
((extract
(milliseconds FROM now
() - (
    select max(edit_date)
   from edit
   where source_id = q.question_id
       AND source_type = 'question'
    ))) /
(extract
(milliseconds FROM now
() -
(
                        select max(answer_creation_timestamp)
from answer
where question_id = q.question_id
group by question_id
                        )
)))
LIMIT 100;
