INSERT INTO question (user_id, question_views, question_creation_timestamp, question_content, question_deleted, question_title)
<<<<<<< HEAD
        VALUES ($1, 1, now(), $2, FALSE, $$ $3 $$)
=======
        VALUES ($1, 1, now(), $2, FALSE, $3 )
>>>>>>> sql-queries
    RETURNING
        *;
-- question.question_id;
