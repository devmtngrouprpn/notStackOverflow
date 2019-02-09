module.exports = {
  homeStart: async (req, res, next) => {
    let { auth_id } = req.params;
    let db = req.app.get("db");
    let getHome = await db.Home.getHome([auth_id]);
    res.status(200).send(getHome);
  },
  // ==========================================================
  questionsInteresting: async (req, res, next) => {
    console.log("starting");
    let db = req.app.get("db");
    let dbResult = await Promise.all([
      db.Home.interesting([]),
      db.Home.featured([]),
      db.Home.hot([]),
      db.Home.week([]),
      db.Home.month([]),
      db.Home.tfeatured([])
    ]);
    console.log("ending");
    let [interesting, featured, hot, week, month, tfeatured] = dbResult;
    res
      .status(200)
      .send({ interesting, featured, hot, week, month, tfeatured });
  },
  // ==========================================================
  worldQuestions: async (req, res, next) => {
    let db = req.app.get("db");
    console.log(Array.isArray(req.session.user));
    let dbResult = await Promise.all([
      db.World.newest([]),
      db.World.featured([]),
      db.World.frequent([]),
      db.World.votes([]),
      db.World.active([]),
      db.World.unanswered.votes([]),
      db.World.unanswered.my_tags([
        (req.session.user || { tags_watching: [] }).tags_watching
      ])
    ]);
    let dbTotal = await Promise.all([
      db.World.totals.featured_total([]),
      db.World.totals.frequent_total([]),
      db.World.totals.question_total([]),
      console.log("I got hit")
    ]);
    // console.log(dbResult);
    let [featuredT, frequentT, allT] = dbTotal;
    // console.log(featuredTotal[0]);
    let featuredTotal = featuredT[0];
    let frequentTotal = frequentT[0];
    let allTotal = allT[0];
    let [
      newest,
      featured,
      frequent,
      votes,
      active,
      unansweredVotes,
      unansweredMyTags
    ] = dbResult;
    res.status(200).send({
      newest,
      featured,
      frequent,
      votes,
      active,
      unansweredVotes,
      unansweredMyTags,
      featuredTotal,
      frequentTotal,
      allTotal
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
    console.log(question_id, dbResult[0][0]);
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
    console.log(question);
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
    const { user_id, source_id, source_type, value } = req.body;
    const db = req.app.get("db");
    const check = await db.questions.check_vote([
      user_id,
      source_id,
      source_type,
      value
    ]);
    if (!check[0]) {
      await db.vote.insert({ user_id, source_id, source_type, value });
      res.sendStatus(201);
    } else if (check[0].res) {
      res.sendStatus(200);
    } else {
      await db.vote.save({ vote_id: check[0].vote_id, value });
      res.status(200);
    }
  },
  // ==========================================================
  addFavorite: async (req, res) => {
    const { user_id, question_id } = req.body;
    const db = req.app.get("db");
    const check = await db.questions.check_favorites([user_id, question_id]);
    let favorites = check[0].favorites;
    if (check[0].res) {
      favorites = favorites.filter(question => question != question_id);
    } else {
      favorites.push(question_id);
    }
    await db.users.save({ auth_id: user_id, favorites });
    const user = await db.get_user([user_id]);
    res.status(200).send(user[0]);
    console.log('hit me baby one more time')
  },
  // ==========================================================
  createQuestion: async (req, res) => {
    const db = req.app.get("db")
    const { user_id, answer_content, question_id } = req.body;
    await db.questions.create_answer([user_id, question_id, answer_content]);
    res.sendStatus(201);
  }
};
