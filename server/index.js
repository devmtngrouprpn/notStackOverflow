require("dotenv").config();
const { DB_CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, DEV } = process.env;

const express = require("express");
const session = require("express-session");
const massive = require("massive");
const authorization = require("./controllers/authorization");
const questions = require("./controllers/questions");

const app = express();
// *** TOPLEVEL MIDDLEWARE *** //

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
massive(DB_CONNECTION_STRING).then(db => {
  app.set("db", db);
});
// app.use((req, res, next) => {
//     if (DEV = 'true') {
//         if (!req.session.user) {
//             req.session.user = {};
//             next();
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });
// *** ENDPOINTS *** //

app.get("/auth/callback", authorization.authCallback);
app.get("/api/user-data", authorization.checkUser);

// HOME START
app.get("/api/home/:auth_id", questions.homeStart);
app.get("/api/questions/interesting", questions.questionsInteresting);
// app.get("/api/questions/featured", questions.questionsFeatured);
// app.get("/api/questions/hot", questions.questionsHot);
// app.get("/api/questions/week", questions.questionsWeek);
// app.get("/api/questions/month", questions.questionsMonth);
// HOME END
// TAGS START
// TAGS END
// USERS START
// USERS END

// *** IM LISTENING! *** //

app.listen(SERVER_PORT, () => console.log(`Listening on PORT: ${SERVER_PORT}`));
