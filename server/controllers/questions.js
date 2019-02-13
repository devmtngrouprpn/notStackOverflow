module.exports = {
  homeStart: async (req, res, next) => {
    let { auth_id } = req.params;
    let db = req.app.get("db");
    let getHome = await db.Home.getHome([auth_id]);
    res.status(200).send(getHome);
  },
  // ==========================================================
  questionsInteresting: async (req, res, next) => {
    let db = req.app.get("db");
    let dbResult = await Promise.all([
      db.Home.interesting([]),
      db.Home.featured([]),
      db.Home.hot([]),
      db.Home.week([]),
      db.Home.month([]),
      db.Home.tfeatured([])
    ]);
    let [interesting, featured, hot, week, month, tfeatured] = dbResult;
    res
      .status(200)
      .send({ interesting, featured, hot, week, month, tfeatured });
  },
  // ==========================================================
  worldQuestions: async (req, res, next) => {
    // console.log(req.session.user);
    let db = req.app.get("db");
    let dbResult = await Promise.all([
      db.World.newest([]),
      db.World.featured([]),
      db.World.frequent([]),
      db.World.votes([]),
      db.World.active([]),
      db.World.unanswered.votes([]),
      db.World.unanswered.my_tags([
        (req.session.user || { tags_watching: [] }).tags_watching
      ]),
      db.World.unanswered.newest([]),
      db.World.unanswered.no_answer([])
    ]);
    let dbTotal = await Promise.all([
      db.World.totals.featured_total([]),
      db.World.totals.frequent_total([]),
      db.World.totals.question_total([]),
      db.World.unanswered.my_tags_total([
        (req.session.user || { tags_watching: [] }).tags_watching
      ]),
      db.World.unanswered.no_answer_total([]),
      db.World.unanswered.question_total([])
    ]);
    let [featuredT, frequentT, allT, myTagsT, noAnswerT, unansweredT] = dbTotal;
    let featuredTotal = featuredT[0];
    let frequentTotal = frequentT[0];
    let allTotal = allT[0];
    let myTagsTotal = myTagsT[0];
    let noAnswerTotal = noAnswerT[0];
    let unansweredTotal = unansweredT[0];
    let [
      newest,
      featured,
      frequent,
      votes,
      active,
      unansweredVotes,
      unansweredMyTags,
      unansweredNewest,
      unansweredNoAnswer
    ] = dbResult;
    res.status(200).send({
      newest,
      featured,
      frequent,
      votes,
      active,
      unansweredVotes,
      unansweredMyTags,
      unansweredNewest,
      unansweredNoAnswer,
      featuredTotal,
      frequentTotal,
      allTotal,
      myTagsTotal,
      noAnswerTotal,
      unansweredTotal
    });
  },
  // ==========================================================
  askQuestions: async (req, res, next) => {
    let { userId, content, title, tags } = req.body;
    let db = req.app.get("db");
    let dbResult = await Promise.all([
      db.user_input.new_question([userId, content, title])
    ]).catch(err => {
      console.log(err);
    });
    let question_id = dbResult[0][0].question_id;
    tags.forEach(tag => {
      db.user_input.new_question_tag([tag, question_id]);
    });

    res.status(200).send({
      message: "Your Question Was Uploaded",
      question_id: question_id
    });
  },
  // ==========================================================
  questionById: async (req, res) => {
    const id = req.query.id;
    const db = req.app.get("db");
    const question = await db.questions.get_question_by_id([id]);
    await db.question.save({
      question_id: id,
      question_views: question[0].question_views + 1
    });
    res.status(200).send(question[0]);
  },
  answerById: async (req, res) => {
    const id = req.query.id;
    const db = req.app.get("db");
    const answer = await db.questions.get_answer_by_id([id]);
    res.status(200).send(answer[0]);
  },
  commentById: async (req, res) => {
    const id = req.query.id;
    const db = req.app.get("db");
    const comment = await db.questions.get_comment_by_id([id]);
    res.status(200).send(comment[0]);
  },
  // ==========================================================
  addVote: async (req, res) => {
    const { user_id, source_id, source_type, value, owner_id } = req.body;
    const db = req.app.get("db");
    const check = await db.questions.check_vote([
      user_id,
      source_id,
      source_type
    ]);

    const repCheck = await db.questions.check_rep([
      source_type.toString(),
      source_id.toString(),
      owner_id
    ]);

    let rep_value;

    if (value > 0) {
      if (source_type === "question") {
        rep_value = 5;
      } else if ((source_type = "answer")) {
        rep_value = 10;
      } else {
        rep_value = 0;
      }
    } else {
      rep_value = -2;
    }

    if (source_type === "question" || source_type === "answer") {
      if (check[0]) {
        if (
          (value > 0 && check[0].value > 0) ||
          (value < 0 && check[0].value < 0)
        ) {
        } else {
          if (value < 0) {
            db.reputation.save({
              reputation_id: repCheck[0].reputation_id,
              amount:
                repCheck[0].amount - (source_type === "question" ? 5 : 10) - 2
            });
            db.reputation.insert({
              user_id,
              amount: -1,
              action_type: "downvote",
              source_id,
              source_type
            });
            // a change to downvote
          } else {
            db.reputation.save({
              reputation_id: repCheck[0].reputation_id,
              amount: repCheck[0].amount + 2 + rep_value
            });
            db.questions.destroy_downvote([
              user_id,
              source_id.toString(),
              source_type
            ]);
            // a change to upvote
          }
        }
        // vote exists flip rep
      } else {
        console.log("nothing made");
        if (repCheck[0]) {
          db.reputation.save({
            reputation_id: repCheck[0].reputation_id,
            amount: repCheck[0].amount + rep_value
          });
        } else {
          db.reputation.input({
            user_id: owner_id,
            amount: rep_value,
            action_type: "vote",
            source_id,
            source_type
          });
        }
        if (rep_value < 0) {
          db.reputation.insert({
            user_id,
            amount: -1,
            action_type: "downvote",
            source_id,
            source_type
          });
        }
      }
    }

    if (req.session.user) {
      if (!check[0]) {
        await db.vote.insert({ user_id, source_id, source_type, value });
        res.sendStatus(201);
      } else {
        await db.vote.save({ vote_id: check[0].vote_id, value });
        res.sendStatus(200);
      }
    } else {
      res.sendStatus(401);
    }
  },
  // ==========================================================
  addFavorite: async (req, res) => {
    const { user_id, question_id, favNum } = req.body;
    const db = req.app.get("db");
    const check = await db.questions.check_favorites([user_id, question_id]);
    let favorites = check[0].favorites;
    if (check[0].res) {
      favorites = favorites.filter(question => question != question_id);
      await db.question.save({ question_id, favorites: favNum - 1 });
    } else {
      favorites.push(question_id);
      await db.question.save({ question_id, favorites: favNum + 1 });
    }
    await db.users.save({ auth_id: user_id, favorites });
    const user = await db.get_user([user_id]);
    res.status(200).send(user[0]);
  },
  // ==========================================================
  createAnswer: async (req, res) => {
    const db = req.app.get("db");
    const { user_id, answer_content, question_id } = req.body;
    await db.questions.create_answer([user_id, question_id, answer_content]);
    res.sendStatus(201);
  },
  createComment: async (req, res) => {
    const db = req.app.get("db");
    const { user_id, source_id, source_type, content } = req.body;
    await db.comment.insert({ user_id, source_id, source_type, content });
    res.sendStatus(201);
  },
  // ==========================================================
  createEdit: async (req, res) => {
    const db = req.app.get("db");
    const {
      edit_title,
      edit_content,
      edit_summary,
      edit_tags,
      user_id,
      source_id,
      source_type
    } = req.body;
    await db.edit.insert({
      edit_title,
      edit_content,
      edit_summary,
      edit_tags,
      source_id,
      source_type,
      user_id
    });
    res.sendStatus(201);
  },
  getEdits: async (req, res) => {
    const db = req.app.get("db");
    const { source_id, source_type } = req.body;
    const pastEdits = await db.questions.get_edits([source_id, source_type]);
    let activeEdit = await db.questions.get_active_edit([
      source_id,
      source_type
    ]);
    activeEdit = activeEdit[0];
    if (activeEdit) {
      res.status(200).send({ pastEdits, activeEdit });
    } else {
      res.sendStatus(404);
    }
  },
  acceptEdit: async (req, res) => {
    const db = req.app.get("db");
    const {
      edit_id,
      user_id,
      source_id,
      source_type,
      edit_content,
      edit_title,
      edit_tags
    } = req.body;
    if (source_type === "question") {
      await db.question.save({
        question_id: source_id,
        question_title: edit_title,
        question_content: edit_content
      });
      await db.questions.clear_tags([source_id]);
      await Promise.all([
        edit_tags.map(tag =>
          db.question_tag.insert({ tag_name: tag, question_id: source_id })
        )
      ]);
      await db.reputation.insert({
        user_id,
        amount: 2,
        action_type: "edit",
        source_id,
        source_type
      });
      await db.edit.save({ edit_id, edit_accepted: true });
    } else if (source_type === "answer") {
      await db.answer.save({
        answer_id: source_id,
        answer_content: edit_content
      });
      await db.reputation.insert({
        user_id,
        amount: 2,
        action_type: "edit",
        source_id,
        source_type
      });
      await db.edit.save({ edit_id, edit_accepted: true });
    } else if (source_type === "comment") {
      await db.comment.save({ comment_id: source_id, content: edit_content });
    }
    res.sendStatus(200);
  },
  declineEdit: async (req, res) => {
    const db = req.app.get("db");
    const { edit_id } = req.query;
    db.edit.destroy({ edit_id });
    res.sendStatus(200);
  },
  // ==========================================================
  search: async (req, res) => {}
};
