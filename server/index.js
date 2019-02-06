require("dotenv").config();
const { DB_CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, DEV } = process.env;

const express = require("express");
const session = require("express-session");
const massive = require("massive");
const authorization = require("./controllers/authorization");
const questions = require("./controllers/questions");
const tinyTag = require("./controllers/tinyTags");
const users = require("./controllers/users");

const app = express();
// *** TOPLEVEL MIDDLEWARE *** //

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  })
);
massive(DB_CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("database connected");
});

// *** ENDPOINTS *** //

app.get("/auth/callback", authorization.authCallback);
app.post("/api/user-data", authorization.checkUser);

// HOME START
app.get("/api/home/:auth_id", questions.homeStart);
app.get("/api/questions/interesting", questions.questionsInteresting);
app.get("/api/questions/world", questions.worldQuestions);
app.post("/api/questions/ask", questions.askQuestions);
// HOME END
// TAGS START
app.post("/api/tags/tinytag", tinyTag.getTag);
app.get("/api/tags/alltinytags", tinyTag.getAllTags);
// TAGS END
// USERS START
app.get("/api/users/allusers", users.getUsers);
// USERS END
// QUESTIONS START
app.get("/api/questions/indv", questions.questionById);
// QUESTIONS END

// *** IM LISTENING! *** //

app.listen(SERVER_PORT, () => console.log(`Listening on PORT: ${SERVER_PORT}`));
