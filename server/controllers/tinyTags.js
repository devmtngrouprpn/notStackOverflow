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
      db.Tags.frequent_total([tag_name]),
      db.Tags.featured_total([tag_name]),
      db.Tags.question_total([tag_name]),
      db.Tags.unanswered_total([tag_name]),
      db.Tags.no_answer_total([tag_name]),
      db.Tags.details([tag_name])
    ]);
    const [
      active,
      frequent,
      featured,
      newest,
      votes,
      unansweredNewest,
      unansweredVotes,
      unansweredNoAnswer,
      frequent_total,
      featured_total,
      total,
      unanswered_total,
      no_answer_total,
      description
    ] = results;
    res.status(200).send({
      active,
      frequent,
      featured,
      newest,
      votes,
      unansweredNewest,
      unansweredVotes,
      unansweredNoAnswer,
      frequent_total: frequent_total[0].question_total,
      featured_total: featured_total[0].featured_total,
      active_total: total[0].question_total,
      votes_total: total[0].question_total,
      newest_total: total[0].question_total,
      unansweredNewest_total: unanswered_total[0].count,
      unansweredVotes_total: unanswered_total[0].count,
      unansweredNoAnswer_total: no_answer_total[0].count,
      description: description[0].description
    });
  }
};
