const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./db');

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
});

app.post('/login', (req, res) => {
    const user = new db.UserModel({
        username: req.body.username,
        password: req.body.password
    });

    db.UserModel.findOne({ user }, (err, userFound) => {
        if (err) {
            console.log(`Error finding user: ${err}`);
        } 
        if (!userFound){
            console.log(userFound)
            user.save(err=>{
                if (err){ console.log(`Error saving user: ${err}`)}
                res.send('ok');
            })
        } else {
            res.send(userFound);
        }
    });
});

app.post('/register', (req, res) => {
    const user = new db.UserModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    db.UserModel.findOne({ user }, (err, userFound) => {
        if (err) {
            console.log(`Error finding user: ${err}`);
        } 
        if (!userFound){
            console.log(userFound)
            user.save(err=>{
                if (err){ console.log(`Error saving user: ${err}`)}
                res.send('ok');
            })
        } else {
            res.send(userFound);
        }
    });
})

app.listen(port, console.log(`Listening on port ${port}`));