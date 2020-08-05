require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./db');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const localStrategy = require('passport-local').Strategy;

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use(session({
    secret: 'verysecretstring',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
        secure: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/login',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    passReqToCallback: true
},
    (req, accessToken, refreshToken, profile, cb) => {
        console.log(profile)
        db.UserModel.findOne({ googleId: profile.id }, (err, user) => {
            if (user) {
                return cb(err, user);
            } else {
                db.UserModel.create({
                    googleId: profile.id,
                    username: profile._json.given_name,
                    email: profile._json.email
                }, (err, newUser) => {
                    return cb(err, newUser);
                })
            }
        });
    }
));

passport.use(db.UserModel.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
});

app.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send(info);
        }
        req.logIn(user, function (logInErr) {
            if (logInErr) {
                return next(logInErr);
            }
            return res.send('logged in');
        });
    })(req, res, next);

});

app.post('/register', (req, res) => {

    db.UserModel.register({ username: req.body.username, email: req.body.email }, req.body.password, (err, user) => {
        if (err) {
            console.log(`Error registering: ${err.name}: ${err.message}`);
            res.send(err.message);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.send('logged in');
            });
        }
    })
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/login',
    passport.authenticate('google'),
    function (req, res) {
        res.redirect('http://localhost:3000/');
    });

app.listen(port, console.log(`Listening on port ${port}`));