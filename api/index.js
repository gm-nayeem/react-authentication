// module import
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
require("./config/passport");
require("./config/database")

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// route import
const authRoute = require("./routes/auth");

const app = express();

// morgan
app.use(morgan('dev'));
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// session
app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            collectionName: "sessions",
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());


// routes
app.use("/auth", authRoute);


// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.stack)
})


// server listen port
app.listen(process.env.PORT, () => {
    console.log("Server is running successfully!!");
});