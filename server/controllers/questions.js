module.exports = {
    homeStart: async (req, res, next) => {
        let {auth_id} = req.params
        let db = req.app.get('db')
        console.log('here',auth_id)
        // let auth_id = 'user1'
        let getHome = await db.Home.getHome([auth_id])
        console.log(getHome)
    },
    questionsInteresting: async(req, res, next) => {

    }
}