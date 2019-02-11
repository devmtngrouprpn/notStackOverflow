SELECT
	count(q.question_id)
FROM
    question AS q
    JOIN users AS u ON u.auth_id = q.user_id
WHERE (
    select bool_or(answer_accepted)
    from answer
    where question_id = q.question_id
) = FALSE
AND (0 <= ANY (select unnest(array_agg(
        (select sum(value) from vote where source_id = answer_id and source_type = 'answer')
    )) from answer where question_id = q.question_id)
    OR -100000 = ALL (select unnest(array_agg((select sum(value) from vote where source_id = answer_id and source_type = 'answer'))) from answer where question_id = q.question_id) IS NULL)
    or (select count(answer_id) from answer where question_id = q.question_id) = 0
    and array['react'] = (select array_agg(tag_name) from question_tag where question_id = q.question_id)
