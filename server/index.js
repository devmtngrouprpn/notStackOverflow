require('dotenv').config()
const { DB_CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, DEV } = process.env;

const express = require('express');
const session = require('express-session');
const massive = require('massive');

const app = express();
// *** TOPLEVEL MIDDLEWARE *** //

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
massive(DB_CONNECTION_STRING)
    .then(db => {
        app.set('db', db);
    });
app.use((req, res, next) => {
    if (DEV = 'true') {
        if (!req.session.user) {
            req.session.user = {};
            next();
        } else {
            next();
        }
    } else {
        next();
    }
});
// *** ENDPOINTS *** //



// *** IM LISTENING! *** //

app.listen(SERVER_PORT, () => console.log(`Listening on PORT: SERVER_PORT`));