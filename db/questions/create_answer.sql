INSERT INTO answer
    (user_id, question_id, answer_content, answer_creation_timestamp, answer_views, answer_accepted, answer_deleted)
VALUES
    ($1, $2, $3, now(), 1, false, false);