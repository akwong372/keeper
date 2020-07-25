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
    console.log(req.body);
    res.send('ok');
})

app.listen(port, console.log(`Listening on port ${port}`));