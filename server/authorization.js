module.exports = {
    authCallback: async (request, response) => {
        const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET } = process.env
        const axios = require('axios')
        let payload = {
            client_id: REACT_APP_CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: request.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${request.headers.host}/auth/callback`
        }
        const tokenResponse = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
        const userResponse = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenResponse.data.access_token}`)
        const db = request.app.get('db')
        const { name, picture, sub, nickname, location } = userResponse.data
        const foundUser = await db.get_user([sub])
        if (foundUser) {
            request.session.user = foundUser[0]
        } else if (name) {
            const createdUser = await db.create_user([sub, name, picture, nickname, location, (new Date())])
            request.session.user = createdUser[0]
        }
        else {
            res.send('please log in')
        }
        response.redirect('http://localhost:3000')
    },
    checkUser: (req, res) => {
        if (req.body.type === 'login') {
            if (req.session.user) {
                res.status(200).send(req.session.user)
            }
            else {
                res.status(200).send('Login')
            }
        }
        if (req.body.type === 'logout') {
            req.session.destroy;
            res.status(200).send('Logged out')
        }
    },
}