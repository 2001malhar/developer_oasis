// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session")
const morgan = require("morgan");

// const MONGO_URL = "mongodb://127.0.0.1:27017/fake_so";
// const CLIENT_URL = "http://localhost:3000";
// const port = 8000;

const { MONGO_URL,CLIENT_URL, port } = require("./config");

const sessionOptions = {
    name:'session',
    resave: false,
    saveUninitialized: false,
    secret : 'mylittlesecret',
    cookie: {
        expires: new Date(
            Date.now() + 1 * 1000 * 60 * 60 * 24
        ),
        httpOnly: true,
        sameSite: true,
        secure: false
    }
}

mongoose.connect(MONGO_URL);

// mongoose.connect("mongodb://mongodb:27017/fake_so");

const app = express();

app.use(
    cors({
        credentials: true,
        origin: [CLIENT_URL],
        methods: [
            'GET',
            'POST',
            'PUT',
            'DELETE'
          ]    
    })
);

app.use(session(sessionOptions))
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(morgan('dev'))

const questionController = require("./controller/question");
const tagController = require("./controller/tag");
const answerController = require("./controller/answer");
const authController = require("./controller/auth");
const commentController = require("./controller/comment");


app.use("/question", questionController);
app.use("/tag", tagController);
app.use("/answer", answerController);
app.use("/comments",commentController);
app.use("/user",authController);

let server = app.listen(port, () => {
    console.log(`Server starts at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    server.close();
    mongoose.disconnect();
    console.log("Server closed. Database instance disconnected");
    process.exit(0);
});

module.exports = server
