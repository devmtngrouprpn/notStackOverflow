module.exports = {
    authCallback: async (request, response) => {
        const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET } = process.env
        const axios = require('axios')
        const payload = {
            client_id: REACT_APP_CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: request.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `https://${request.headers.host}/auth/callback`
        }
        const tokenResponse = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
        const userResponse = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenResponse.data.access_token}`)

        const db = request.app.get('db')
        const { name, picture, sub, nickname } = userResponse.data
        // const foundUser =   
        // //  await db.find_user([sub])

        if (foundUser[0]) {
            request.session.user = foundUser[0]
        } else if (name) {
            const createdUser = await db.create_user([name, picture, sub])
            request.session.user = createdUser[0]
        }
        else {
            const createdUser = await db.create_user([nickname, picture, sub])
            request.session.user = createdUser[0]
        }
        response.redirect('/')
    }, checkUser: (request, response) => {
        if (request.session.user) {
            response.status(200).send(request.session.user)
        }
        else {
            response.status(200).send('Login')
        }
    },
}