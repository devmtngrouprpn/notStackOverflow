select
    u.*,
    (
    select sum(amount)
    from reputation
    where user_id = u.auth_id
    ) as reputation
 from users as u limit 40;