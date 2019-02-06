INSERT INTO users (auth_id, user_first_last, picture, username, LOCATION, user_created, personal_site, facebook, git_hub, twitter, occupation, bio, user_views, last_logout, tags_watching, favorites)
        VALUES ($1, $2, $3, $4, $5, now(), '', '', '', '', '', '', 0, now(), '{}', '{}')
    RETURNING
        users;
