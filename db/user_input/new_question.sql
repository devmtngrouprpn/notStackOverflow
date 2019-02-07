INSERT INTO question (user_id, question_views, question_creation_timestamp, question_content, question_deleted, question_title)
        VALUES ($1, 1, now(), $$ $2 $$, FALSE, $$ $3 $$)
    RETURNING
        *;
-- question.question_id;
