// external import
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const passportSetup = require("./passport");
const passport = require("passport");
const cookieSession = require("cookie-session");

// internal import
const authRoute = require("./routes/auth");

const app = express();

// cookie-session
app.use(
    cookieSession({ 
        name: "session", keys: ["mern"], maxAge: 24 * 60 * 60 * 100 
    })
);

// pasport
app.use(passport.initialize());
app.use(passport.session());

// morgan
app.use(morgan('dev'));

// cors
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// routes
app.use("/auth", authRoute);


// server listen port
app.listen(process.env.PORT, () => {
    console.log("Server is running successfully!!");
});