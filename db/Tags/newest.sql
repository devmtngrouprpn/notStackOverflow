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
                            question_id = q.question_id) AS answer_accepted, u.username, u.picture, substring(regexp_replace(q.question_content, '<[^<]+>', '', 'g'), '^[^\n\r]{0,200}\M') || ' ...' AS content, question_title, question_views, question_creation_timestamp, (
	select max(edit_date)
    from edit
    where source_id = q.question_id
        AND source_type = 'question'
	) as last_edit, question_id, q.user_id
FROM
    question AS q
    JOIN users AS u ON u.auth_id = q.user_id
WHERE $1 = ANY (select unnest(array_agg(tag_name)) from question as q2 join question_tag as qt ON qt.question_id = q2.question_id where q2.question_id = q.question_id)
ORDER BY
    q.question_creation_timestamp desc NULLS LAST;

