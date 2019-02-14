UPDATE users
    SET tags_watching = ARRAY[$1] || (select tags_watching from user where auth_id = $2)
    WHERE auth_id = $2
    RETURNING tags_watching;