module.exports = {
  getTag: async (req, res) => {
    let { subject } = req.body;
    let db = req.app.get("db");
    let getHome = await db.Tags.make_tiny_tag([subject]);
    res.status(200).send(getHome[0]);
  },
  getAllTags: async (req, res, next) => {
    let db = req.app.get("db");
    let getTags = await Promise.all([
      db.Tags.alltags([]),
      db.Tags.all_tags_week([]),
      db.Tags.all_tags_day([])
    ]);
    let [allTags, week, day] = getTags;
    res.status(200).send(allTags, week, day);

  }
};
