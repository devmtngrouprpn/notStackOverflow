module.exports = {
  getUsers: async (req, res) => {
    let db = req.app.get("db");
    let users = await db.Users.select_40_users([]);
    res.status(200).send(users);
  },
  getFullUserData: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.query;
    const user = await db.Users.select_user_data([user_id]);

    res.status(200).send({ basicData: user });
  }
};
