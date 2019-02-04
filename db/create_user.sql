INSERT INTO users (auth_id, user_first_last, picture, username, LOCATION, user_created, reputation, personal_site, facebook, git_hub, twitter, occupation, bio, profile_views, last_logout, tags_watching)
        VALUES ($1, $2, $3, $4, '', now(), 1, '', '', '', '', '', '', 0, now(), '{}')
    RETURNING
        users;
