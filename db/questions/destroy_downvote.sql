delete from reputation 
    where user_id = $1 AND source_id = $2 AND source_type = $3 AND action_type = 'downvote'