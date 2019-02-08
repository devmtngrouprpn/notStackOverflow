select
    *,
    (
        select sum(amount)
    from reputation
    where user_id = auth_id
    ) as reputation
from users
where auth_id = $1;