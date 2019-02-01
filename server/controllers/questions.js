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
    let results = dbResult.map((list, i) => {
      let idArr = [];
      if (i === 0) {
        // console.log("list", list, i);
      }
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

    let [interesting, featured, hot, week, month, tfeatured] = results;
    res
      .status(200)
      .send({ interesting, featured, hot, week, month, tfeatured });
  },
  // ==========================================================
  worldQuestions: async (req, res, next) => {
    let db = req.app.get("db");
    console.log("world");
    let dbResult = await Promise.all([
      db.World.newest([]),
      db.World.featured([]),
      db.World.frequent([]),
      db.World.votes([]),
      db.World.active([]),
      // db.World.unanswered.unanswered([])
      Promise.all([db.World.totals.all([])])
    ]);

    console.log("world");
    let results = dbResult.map((list, i) => {
      let idArr = [];
      if (i === 0) {
        // console.log("list", list, i);
      }
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

    let [newest, featured, frequent, votes, active, unanswered] = results;
    res
      .status(200)
      .send({ newest, featured, frequent, votes, active, unanswered });
  },
  // ==========================================================
  askQuestions: async (req, res, next) => {
    let { userId, content, title } = req.body;
    let db = req.app.get("db");
    console.log(userId, content, title);
    let dbResult = await Promise.all([
      db.user_input.new_question([userId, content, title])
    ]);
    console.log(dbResult);
  }
};
