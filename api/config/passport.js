require("dotenv").config();
const User = require("../models/User");
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;


// google
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const user = await User.findOne({ userId: profile.id });
                if (!user) {
                    let newUser = new User({
                        userId: profile.id,
                        user_name: profile.displayName,
                        email: "gm.nayeem533@gmail.com",
                        profilePic: profile.photos[0].value,
                    });

                    await newUser.save();
                    return cb(null, newUser);
                } else {
                    return cb(null, user);
                }

            } catch (err) {
                return cb(err, null);
            }
        }
    )
);

// github
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                console.log(profile)
                const user = await User.findOne({ userId: profile.id });
                if (!user) {
                    let newUser = new User({
                        userId: profile.id,
                        user_name: profile.displayName,
                        email: "gmnayeem25@gmail.com",
                        profilePic: profile.photos[0].value,
                    });

                    await newUser.save();
                    return cb(null, newUser);
                } else {
                    return cb(null, user);
                }

            } catch (err) {
                return cb(err, null);
            }
        }
    )
);


// create session id
// whenever we login it creares user id inside session
passport.serializeUser((user, done) => {
    done(null, user.userId);
});

// find session info using session id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({ userId: id });
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});