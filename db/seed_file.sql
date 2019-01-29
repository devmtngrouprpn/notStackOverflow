-- initialize DB Start --
CREATE TABLE "user" (
	"auth_id" VARCHAR(255) NOT NULL,
	"username" TEXT NOT NULL,
	"reputation" integer NOT NULL,
	"url" TEXT NOT NULL,
	"user_created" TIMESTAMP NOT NULL,
	"user_first_last" TEXT,
	"personal_site" varchar(300) NOT NULL,
	"location" varchar(300) NOT NULL,
	"facebook" varchar(300) NOT NULL,
	"git_hub" varchar(300) NOT NULL,
	"twitter" varchar(300) NOT NULL,
	"occupation" varchar(200) NOT NULL,
	"bio" varchar(300) NOT NULL,
	"tags_watching" text[] NOT NULL,
	"profile_views" integer NOT NULL,
	"last_logout" TIMESTAMP NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY ("auth_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "question" (
	"question_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"tags" text[] NOT NULL,
	"question_views" integer NOT NULL,
	"question_last_edit" TIMESTAMP NOT NULL,
	"question_creation_timestamp" TIMESTAMP NOT NULL,
	"question_content" TEXT NOT NULL,
	"question_deleted" BOOLEAN NOT NULL,
	"modified" BOOLEAN NOT NULL,
	"modified_time" TIMESTAMP NOT NULL,
	CONSTRAINT question_pk PRIMARY KEY ("question_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tag" (
	"name" varchar(30) NOT NULL,
	"tag_views" integer NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT tag_pk PRIMARY KEY ("name")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "bounty" (
	"bounty_id" serial NOT NULL,
	"question_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"bounty_winner" TEXT,
	"bounty_value" integer NOT NULL,
	"bounty_creation_timestamp" TIMESTAMP NOT NULL,
	"bounty_active" BOOLEAN NOT NULL,
	CONSTRAINT bounty_pk PRIMARY KEY ("bounty_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "answer" (
	"answer_id" serial NOT NULL,
	"user_id" TEXT NOT NULL,
	"question_id" integer NOT NULL,
	"answer_content" TEXT NOT NULL,
	"answer_creation_timestamp" TIMESTAMP NOT NULL,
	"answer_last_edit" TIMESTAMP NOT NULL,
	"answer_views" integer NOT NULL,
	"answer_accepted" BOOLEAN NOT NULL,
	"answer_deleted" BOOLEAN NOT NULL,
	"modified" BOOLEAN NOT NULL,
	"modified_time" TIMESTAMP NOT NULL,
	CONSTRAINT answer_pk PRIMARY KEY ("answer_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"comment_id" serial NOT NULL,
	"source_id" integer NOT NULL,
    "source_type" text not null,
	"content" TEXT NOT NULL,
	CONSTRAINT comments_pk PRIMARY KEY ("comment_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "question_tag" (
	"tag_name" TEXT NOT NULL,
	"question_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "badge" (
	"badge_id" serial NOT NULL,
	"name" serial NOT NULL,
	"class" serial NOT NULL,
	"description" serial NOT NULL,
	CONSTRAINT badge_pk PRIMARY KEY ("badge_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "badge_user" (
	"badge_user_id" serial NOT NULL,
	"user_id" TEXT NOT NULL,
	"badge_id" integer NOT NULL,
	"completion" integer[] NOT NULL,
	"awarded" BOOLEAN NOT NULL,
	"date_awarded" TIMESTAMP,
	CONSTRAINT badge_user_pk PRIMARY KEY ("badge_user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reputation" (
	"reputation_id" serial NOT NULL,
	"reputation_time" TIMESTAMP NOT NULL,
	"user_id" TEXT NOT NULL,
	"amount" integer NOT NULL,
	"action_type" TEXT NOT NULL,
	"question_source_id" integer NOT NULL,
	CONSTRAINT reputation_pk PRIMARY KEY ("reputation_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "vote" (
	"vote_id" serial NOT NULL,
	"user_id" TEXT NOT NULL,
	"up_or_down" BOOLEAN NOT NULL,
	"source_id" integer NOT NULL,
	"source_type" TEXT NOT NULL,
	CONSTRAINT vote_pk PRIMARY KEY ("vote_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "edit" (
	"edit_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"edit_date" TIMESTAMP NOT NULL,
	"edit_summary" varchar(500) NOT NULL,
	"source_id" integer NOT NULL,
	"source_type" TEXT NOT NULL,
	CONSTRAINT edit_pk PRIMARY KEY ("edit_id")
) WITH (
  OIDS=FALSE
);


-- TABLE ALTERS Start--
-- Forigen Keys Start --
ALTER TABLE "question" ADD CONSTRAINT "question_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("auth_id");


ALTER TABLE "bounty" ADD CONSTRAINT "bounty_fk0" FOREIGN KEY ("question_id") REFERENCES "question"("question_id");
ALTER TABLE "bounty" ADD CONSTRAINT "bounty_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("auth_id");
ALTER TABLE "bounty" ADD CONSTRAINT "bounty_fk2" FOREIGN KEY ("bounty_winner") REFERENCES "user"("auth_id");

ALTER TABLE "answer" ADD CONSTRAINT "answer_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("auth_id");
ALTER TABLE "answer" ADD CONSTRAINT "answer_fk1" FOREIGN KEY ("question_id") REFERENCES "question"("question_id");


ALTER TABLE "question_tag" ADD CONSTRAINT "question_tag_fk0" FOREIGN KEY ("tag_name") REFERENCES "tag"("name");
ALTER TABLE "question_tag" ADD CONSTRAINT "question_tag_fk1" FOREIGN KEY ("question_id") REFERENCES "question"("question_id");


ALTER TABLE "badge_user" ADD CONSTRAINT "badge_user_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("auth_id");
ALTER TABLE "badge_user" ADD CONSTRAINT "badge_user_fk1" FOREIGN KEY ("badge_id") REFERENCES "badge"("badge_id");

ALTER TABLE "reputation" ADD CONSTRAINT "reputation_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("auth_id");

ALTER TABLE "vote" ADD CONSTRAINT "vote_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("auth_id");

ALTER TABLE "edit" ADD CONSTRAINT "edit_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("auth_id");
-- Forigen Keys End --
-- Table Changes Start --

ALTER TABLE "public"."users" ADD COLUMN "picture" text;

ALTER TABLE "public"."answer"
  ALTER COLUMN "answer_last_edit" DROP NOT NULL,
  ALTER COLUMN "modified_time" DROP NOT NULL;

ALTER TABLE "public"."users"
  ADD COLUMN "picture" text,
  ADD UNIQUE ("auth_id");

ALTER TABLE "public"."users"
  DROP CONSTRAINT "users_auth_id_key",
  ADD UNIQUE ("username");


-- Table Changes End --

-- TABLE ALTERS End--

-- initialize DB End --
-- Drop DB Start --
ALTER TABLE "question" DROP CONSTRAINT IF EXISTS "question_fk0";

ALTER TABLE "bounty" DROP CONSTRAINT IF EXISTS "bounty_fk0";

ALTER TABLE "bounty" DROP CONSTRAINT IF EXISTS "bounty_fk1";

ALTER TABLE "bounty" DROP CONSTRAINT IF EXISTS "bounty_fk2";

ALTER TABLE "answer" DROP CONSTRAINT IF EXISTS "answer_fk0";

ALTER TABLE "answer" DROP CONSTRAINT IF EXISTS "answer_fk1";

ALTER TABLE "question_tag" DROP CONSTRAINT IF EXISTS "question_tag_fk0";

ALTER TABLE "question_tag" DROP CONSTRAINT IF EXISTS "question_tag_fk1";

ALTER TABLE "badge_user" DROP CONSTRAINT IF EXISTS "badge_user_fk0";

ALTER TABLE "badge_user" DROP CONSTRAINT IF EXISTS "badge_user_fk1";

ALTER TABLE "reputation" DROP CONSTRAINT IF EXISTS "reputation_fk0";

ALTER TABLE "vote" DROP CONSTRAINT IF EXISTS "vote_fk0";

ALTER TABLE "edit" DROP CONSTRAINT IF EXISTS "edit_fk0";

DROP TABLE IF EXISTS "user";

DROP TABLE IF EXISTS "question";

DROP TABLE IF EXISTS "tag";

DROP TABLE IF EXISTS "bounty";

DROP TABLE IF EXISTS "answer";

DROP TABLE IF EXISTS "comments";

DROP TABLE IF EXISTS "question_tag";

DROP TABLE IF EXISTS "badge";

DROP TABLE IF EXISTS "badge_user";

DROP TABLE IF EXISTS "reputation";

DROP TABLE IF EXISTS "vote";

DROP TABLE IF EXISTS "edit";

-- Drop DB END --
-- DB Queries Start --
-- DB Queries END --
