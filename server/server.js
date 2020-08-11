require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./db');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const port = process.env.PORT || 8080;

app.use(cors({	
    origin: "http://localhost:3000", // allow to server to accept request from different origin	
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",	
    credentials: true // allow session cookie from browser to pass through	
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: 'user has not been authenticated'
        });
    } else {
        next();
    }
};

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(cookieParser());

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
        db.UserModel.findOne({ googleId: profile.id }, (err, user) => {
            if (user) {
                return cb(err, user);
            } else {
                db.UserModel.create({
                    googleId: profile.id,
                    username: profile._json.given_name,
                    email: profile._json.email,
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

app.get('/loggedin', authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: 'user successfully authenticated',
        user: req.user,
        cookies: req.cookies
    });
});

app.post('/login', (req, res, next) => {
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
            console.log(req.user)
            res.redirect('/loggedin');
        });
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
});

app.post('/register', (req, res) => {
    db.UserModel.register({ username: req.body.username, email: req.body.email, notes: [] }, req.body.password, (err, user) => {
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
    (req, res) => {
        res.redirect('http://localhost:3000/');
    });

app.post('/note', (req, res) => {
    let note = { ...req.body }
    let userId = req.user._id
    db.UserModel.findByIdAndUpdate(userId, {
        $push: {
            notes: note
        }
    }, { useFindAndModify: false }, (err, user) => {
        res.send('ok');
    });
});

app.post('/deletenote', (req, res) => {
    let userId = req.user._id;
    db.UserModel.findByIdAndUpdate(userId, {
        $pull: {
            notes: { id: req.body.id }
        }
    }, { useFindAndModify: false }, (err, notes) => {
        res.send('deleted');
    });
});


app.listen(port, console.log(`Listening on port ${port}`));