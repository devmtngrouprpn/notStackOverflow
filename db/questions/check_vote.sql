SELECT
    (
 	CASE
 	 WHEN (value = $4)
 	  THEN TRUE
 	 WHEN (value <> $4)
 	  THEN FALSE 
 	END
    ) as res,
    vote_id
FROM vote
WHERE user_id = $1 and source_id = $2 and source_type = $3;