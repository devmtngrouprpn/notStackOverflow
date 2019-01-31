module.exports = {
  homeStart: async (req, res, next) => {
    let { auth_id } = req.params;
    let db = req.app.get("db");
    let getHome = await db.Home.getHome([auth_id]);
    res.status(200).send(getHome);
  },
  questionsInteresting: async (req, res, next) => {
    let db = req.app.get("db");
    let prom = await Promise.all([
      db.Home.interesting([]),
      db.Home.featured([]),
      db.Home.hot([]),
      db.Home.week([]),
      db.Home.month([])
    ]);
    let [interesting, featured, hot, week, month] = prom;
    res.status(200).send({ interesting, featured, hot, week, month });
  },
  worldQuestions: async (req, res, next) => {
    let db = req.app.get("db");
    let promise = await Promise.all([
      db.World.newest([]),
      db.World.featured([]),
      db.World.frequent([]),
      db.World.votes([]),
      db.World.active([]),
      db.World.unanswered([])
    ]);
    let [newest, featured, frequent, votes, active, unanswered] = promise;
    res
      .status(200)
      .send({ newest, featured, frequent, votes, active, unanswered });
  }
};
