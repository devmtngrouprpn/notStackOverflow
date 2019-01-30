module.exports = {
    getTag: async (req, res) => {
        let { subject } = req.body
        let db = req.app.get('db')
        let getHome = await db.Tags.make_tiny_tag([subject])
        res.status(200).send(getHome[0])
    }
}