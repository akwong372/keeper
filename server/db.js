const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/keeperDB', { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new Schema({
    'username': String,
    'password': String,
    'email': String,
    'googleId': String,
    'notes': [{ 'id': String, 'title': String, 'content': String }]
});

userSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', userSchema);

module.exports.UserModel = UserModel;