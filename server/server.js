const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./db');
const session = require('express-session');
const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'verysecretstring',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(db.UserModel.createStrategy());
 
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    db.UserModel.findById(id, function (err, user) {
      done(err, user);
    });
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
});

app.post('/login', (req, res) => {
    const userDetails = new db.UserModel({
        username: req.body.username,
        password: req.body.password
    });

    // db.UserModel.findOne(userDetails, (err, userFound) => {
    //     if (err) {
    //         console.log(`Error finding user: ${err}`);
    //     }
    //     if (!userFound) {
    //         console.log(userFound);
    //         res.send('pls use register page')
    //     } else {
    //         res.send(userFound);
    //     }
    // });

    req.login(userDetails, (err) => {
        if (err) {
            console.log(`Error logging in: ${err}`);
            return res.send('error logging in');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.send('logged in');
            });
        }
    });
});

app.post('/register', (req, res) => {
    // const user = new db.UserModel({
    //     username: req.body.username,
    //     password: req.body.password,
    //     email: req.body.email
    // });
    // console.log(user)

    // db.UserModel.findOne(user, (err, userFound) => {
    //     if (err) {
    //         console.log(`Error finding user: ${err}`);
    //     }
    //     if (!userFound) {
    //         console.log(userFound)
    //         user.save(err => {
    //             if (err) { console.log(`Error saving user: ${err}`) }
    //             res.send('ok');
    //         })
    //     } else {
    //         res.send('pls use login page');
    //     }
    // });

    db.UserModel.register({ username: req.body.username, email: req.body.email }, req.body.password, (err, user) => {
        if (err) {
            console.log(`Error registering user: ${err}`);
            res.redirect('error loggin in');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.send('logged in');
            });
        }
    })
})

app.listen(port, console.log(`Listening on port ${port}`));