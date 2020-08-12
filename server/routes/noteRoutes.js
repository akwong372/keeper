const db = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
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

router.post('/delete', (req, res) => {
    let userId = req.user._id;
    db.UserModel.findByIdAndUpdate(userId, {
        $pull: {
            notes: { id: req.body.id }
        }
    }, { useFindAndModify: false }, (err, notes) => {
        res.send('deleted');
    });
});

module.exports = router;