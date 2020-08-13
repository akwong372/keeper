const KEYS = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const port = process.env.PORT || 8080;

mongoose.connect(KEYS.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });

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

app.use(cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin	
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through	
}));

app.use(express.static(path.join(__dirname, '/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.use('/auth', authRoutes);

app.use('/note', noteRoutes);

app.get('/loggedin', authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: 'user successfully authenticated',
        user: req.user,
        cookies: req.cookies
    });
});

app.listen(port, console.log(`Listening on port ${port}`));