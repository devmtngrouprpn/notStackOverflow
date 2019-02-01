select tag_name,tag_views,description,watchers,questions
 from tag innner 
 inner join (select count(*) from question_tag where tag_name = $1) as questions
  on tag_name = $1
