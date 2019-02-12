module.exports = {
  getUsers: async (req, res) => {
    let db = req.app.get("db");
    let users = await db.Users.select_40_users([]);
    res.status(200).send(users);
  },
  getIndiUser: async (req, res) => {}
};
