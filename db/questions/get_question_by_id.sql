SELECT q.*, u.username, sum(r.amount) as reputation, array_agg(a.answer_id) as answers, array_agg(DISTINCT qt.tag_name) as tags 
FROM question as q
    left JOIN answer AS a ON q.question_id = a.question_id
    left JOIN users AS u ON q.user_id = u.auth_id
    left JOIN reputation AS r ON r.user_id = u.auth_id
    left JOIN question_tag AS qt ON q.question_id = qt.question_id
	WHERE q.question_id = 8
    GROUP BY q.question_id, u.auth_id;