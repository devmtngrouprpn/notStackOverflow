UPDATE users
    SET tags_ignored = ARRAY[$1] || (select tags_ignored from user where auth_id = $2)
    WHERE auth_id = $2
    RETURNING tags_ignored;