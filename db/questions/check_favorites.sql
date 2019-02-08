SELECT
    (
	CASE 
		WHEN ($2 = ANY (favorites))
THEN true
		WHEN
($2 <> ANY
(favorites))
			THEN false
END
	) as res,
	favorites
FROM users
WHERE auth_id = $1
