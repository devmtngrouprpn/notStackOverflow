select
    u.*,
    (
    select sum(amount)
    from reputation
    where user_id = users.auth_id
    ) as reputation;
 from users limit 40;