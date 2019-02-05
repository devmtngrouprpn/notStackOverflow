INSERT INTO reputation (reputation_time, user_id, amount, action_type, source_id, source_type)
    VALUES (now(), $1, 1, 'Created Account', , 'users');