insert into users 
(auth_id,user_first_last,picture,username,location,user_created,reputation,personal_site,facebook,git_hub,twitter,occupation,bio,profile_views,last_logout,tags_watching)
values ($1,$2,$3,$4,'Canada',now(),1,'','','','','','',0,now(),'{}')
returning users;