SELECT
    (
        SELECT
            sum(amount)
        FROM
            reputation
        WHERE
            user_id = q.user_id) AS reputation, (
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
                        question_id = q.question_id) AS answer_accepted, u.username, u.picture, substring(regexp_replace(q.question_content, '<[^<]+>', '', 'g'), '^[^\n\r]{0,200}\M') || ' ...' AS content, question_title, question_views, question_creation_timestamp, question_last_edit, q.user_id, (extract(epoch FROM (now() - q.question_creation_timestamp)::interval)) AS question_creation, q.question_creation_timestamp AS question_created, (extract(epoch FROM (now() - q.question_last_edit)::interval)) AS question_edit, q.question_last_edit AS question_edit_time
                FROM
                    question AS q
                    JOIN users AS u ON u.auth_id = q.user_id
                    LEFT JOIN answer a ON a.question_id = q.question_id
                WHERE ((extract(day FROM now() - q.question_creation_timestamp))) <= 1
            ORDER BY
                ((1 + q.question_views) / (1 + extract(day FROM now() - q.question_creation_timestamp)))
                DESC
            LIMIT 100;

