module.exports = {
  getTag: async (req, res) => {
    let { subject } = req.body;
    let db = req.app.get("db");
    let getHome = await db.Tags.make_tiny_tag([subject]);
    res.status(200).send(getHome[0]);
  },
  getAllTags: async (req, res) => {
    // console.log('hit')
    let db = req.app.get("db");
    let promise = await Promise.all([
      db.Tags.all_tags_popular([]),
      db.Tags.all_tags_name([])
    ]);
    // console.log(promise);
    const [popular, name] = promise;
    res.status(200).send({ popular, name });
  }
};
