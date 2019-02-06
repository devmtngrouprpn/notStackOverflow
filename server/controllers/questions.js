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
    let dbResult = await Promise.all([
      db.World.newest([]),
      db.World.featured([]),
      db.World.frequent([]),
      db.World.votes([]),
      db.World.active([])
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
    let [newest, featured, frequent, votes, active, unanswered] = dbResult;
    res.status(200).send({
      newest,
      featured,
      frequent,
      votes,
      active,
      unanswered,
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

    res
      .status(200)
      .send({
        message: "Your Question Was Uploaded",
        question_id: question_id
      });
  },
  // ==========================================================
  questionById: async (req, res) => {
    const id = req.query.id;
    const db = req.app.get("db");
    const question = await db.questions.get_question_by_id([id]);
    res.status(200).send(question);
  },
  answerById: async (req, res) => {
    const id = req.query.id;
    const db = req.app.get("db");
    const answer = await db.questions.get_answer_by_id([id]);
    res.status(200).send(answer);
  }
};
