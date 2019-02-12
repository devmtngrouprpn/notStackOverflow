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
  },
  getTagQuestions: async (req, res) => {
    const db = req.app.get("db");
    const { tag_name } = req.query;
    const results = await Promise.all([
      db.Tags.active([tag_name]),
      db.Tags.frequent([tag_name]),
      db.Tags.featured([tag_name]),
      db.Tags.newest([tag_name]),
      db.Tags.votes([tag_name]),
      db.Tags.unanswered_newest([tag_name]),
      db.Tags.unanswered_votes([tag_name]),
      db.Tags.no_answers([tag_name]),
      db.Tags.frequent_total([tag_name])
    ]);
    console.log(results);
    const [
      active,
      frequent,
      featured,
      newest,
      votes,
      unansweredNewest,
      unansweredVotes,
      unansweredNoAnswer
    ] = results;
    res.status(200).send({
      active,
      frequent,
      featured,
      newest,
      votes,
      unansweredNewest,
      unansweredVotes,
      unansweredNoAnswer
    });
  }
};
