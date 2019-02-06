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
    let db = req.app.get("db");
    let dbResult = await Promise.all([
      db.World.newest([]),
      db.World.featured([]),
      db.World.frequent([]),
      db.World.votes([]),
      db.World.active([])
    ]);
    let results = dbResult.map((list, i) => {
      let idArr = [];
      // let title = list[i].question_title.replace(/^'/, "");
      // console.log(title);
      const newList = list.map(item => {
        if (!idArr.includes(item.question_id)) {
          idArr.push(item.question_id);
          let newItem = { ...item, tags: [item.tags] };
          list.forEach(item2 => {
            if (
              item.question_id === item2.question_id &&
              !newItem.tags.includes(item2.tags)
            ) {
              newItem.tags.push(item2.tags);
            }
          });
          if (i === 0) {
            // console.log("newItem", newItem);
          }
          return newItem;
        }
      });
      if (i === 0) {
        // console.log("newList", newList);
      }
      return newList.filter(item => item);
    });
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
    let [newest, featured, frequent, votes, active, unanswered] = results;
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
    console.log(userId);
    console.log(req.body);
    let db = req.app.get("db");
    let dbResult = await Promise.all([
      db.user_input.new_question([userId, content, title])
    ]).catch(err => {
      console.log(err);
    });
    console.log("first db");
    let question_id = dbResult[0][0].question_id;
    console.log(question_id, dbResult[0][0]);
    tags.forEach(tag => {
      db.user_input.new_question_tag([tag, question_id]);
    });

    res.status(200).send({ message: "Your Question Was Uploaded" });
  },
  // ==========================================================
  questionById: async (req, res) => {
    const id = req.query.id;
    const db = req.app.get("db");
    const question = await db.questions.get_question_by_id([id]);
    console.log(question);
    // let answers = await Promise.all(question[0].answers.map(id => db.questions.)
  }
};
