insert into users (auth_id, username, reputation, user_created, user_first_last, personal_site, location, facebook, git_hub, twitter, occupation, bio, tags_watching, profile_views, last_logout)
values('user1','HGIRyan',1,NOW(),'Ryan Hutchison','','','','','','','','{javascript, sql, react}',1,NOW());

insert into users (auth_id, username, reputation, user_created, user_first_last, personal_site, location, facebook, git_hub, twitter, occupation, bio, tags_watching, profile_views, last_logout)
values('user2','PWhip',1,NOW(),'Payton Whipple ','','','','','','','','{javascript, sql, react}',1,NOW());


select * from users

insert into question (user_id, tags, question_views, question_creation_timestamp, question_content, question_deleted, modified)
values ('user1', '{javascript, react}', 1, NOW(), 'Im using Rails 4.1 and Postgresql (with PG gem) as my database. I have a very stand many to many association from companies to provinces with a join table called regions. Now obviously the regions table has no primary key cause I used { :id => false }. But when I try to use depending destroy or just simply calling destroy on the region object it self I get this error:', false, false);


insert into question (user_id, tags, question_views, question_creation_timestamp, question_content, question_deleted, modified)
values ('user1', '{javascript, react}', 1, NOW(), 'This is a question about how dumb some coding things are', false, false)


insert into question (user_id, tags, question_views, question_creation_timestamp, question_content, question_deleted, modified)
values ('user2', '{javascript, react}', 1, NOW(), 'I know the problem is caused due to the lack of a primary key for the regions table. And oddly if I add the primary key back to the table destroy works fine and no error. However, if I remove the primary key from the table the error comes back. I know this has something to do with the postgres but Ive no idea how to solve this without having to add a primary key column to my regions table.
Here is the actual query', false, false);


insert into question (user_id, tags, question_views, question_creation_timestamp, question_content, question_deleted, modified)
values ('user2', '{javascript, vue}', 1, NOW(), 'I have a group chat message build using Vue.js. I am currently fetching the messages which returns an array like this:', false, false);

insert into answer (user_id, question_id, answer_content,answer_creation_timestamp, answer_views, answer_accepted, answer_deleted, modified )
values('user1', 3, 'computed: {
    sortedPosts() {
        return this.posts.sort((a, b) => {
            if (a.post_date < b.post_date) return -1;
            else if (a.post_date > b.post_date) return +1;
            return 0;
        });
    },
', NOW(), 1, false, false, false);
insert into answer (user_id, question_id, answer_content,answer_creation_timestamp, answer_views, answer_accepted, answer_deleted, modified )
values('user2', 4, '    groupedPosts() {
        const posts = this.sortedPosts.reduce((post, grouped) => {
            if (grouped.length === 0) 
                grouped.unshift([post]);
            else if (grouped[0][0].user.uid === post.user.uid)
                grouped[0].push(post);
            else
                grouped.unshift([post]);
            return grouped;
        }, []);
        return posts.reverse();
    }

', NOW(), 1, true, false, false);
insert into answer (user_id, question_id, answer_content,answer_creation_timestamp, answer_views, answer_accepted, answer_deleted, modified )
values('user1', 2, 'let dataByUser = {};

//Iterate over your data
for (let i = 0; i < data.length; i++) {
    //If the object doesnt have a key equal to the current objects username, 
    //add it as a new key and set the values to a new array containing this datum.
    if(!dataByUser.hasOwnProperty(data[i].user.uid) {
        dataByUser[data[i].user.uid] = new Array(data[i]);
    } else {
        //If it does exist, push to the array for the existing key.
        dataByUser[data[i].user.uid].push(data[i]);
    }
}', NOW(), 1, false, false, false);

insert into bounty(question_id, user_id, bounty_value, bounty_creation_timestamp, bounty_active)
values(3, 'user1', 200, now(), true);

insert into comments (source_id, source_type, content)
values(3, 'question', 'hey I think you spelled some stuff wrong');

insert into comments (source_id, source_type, content)
values(2, 'answer', 'hey I think you spelled everything wrong');










