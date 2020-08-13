const KEYS = require('../config/keys');
const db = require('../models/users');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: KEYS.GOOGLE_ID,
    clientSecret: KEYS.GOOGLE_SECRET,
    callbackURL: 'https://keeper-app-1.herokuapp.com/auth/google/login',//change to http://localhost:8080/ in dev
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    passReqToCallback: true
},
    (req, accessToken, refreshToken, profile, cb) => {
        db.UserModel.findOne({ googleId: profile.id }, (err, user) => {
            if (user) {
                return cb(err, user);
            } else {
                db.UserModel.create({
                    googleId: profile.id,
                    username: profile._json.given_name,
                    notes: []
                }, (err, newUser) => {
                    return cb(err, newUser);
                })
            }
        });
    }
));

passport.use(db.UserModel.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { successRedirect: '/' }, (err, user, info) => {
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
            res.redirect('/loggedin');
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');//change to http://localhost:3000/ in dev
});

router.post('/register', (req, res) => {
    db.UserModel.register({ username: req.body.username, notes: [] }, req.body.password, (err, user) => {
        if (err) {
            console.log(`Error registering: ${err.name}: ${err.message}`);
            res.send(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/loggedin');
            });
        }
    })
});

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/login',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/');//change to http://localhost:3000/ in dev
    });

module.exports = router;