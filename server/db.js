const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/keeperDB', { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new Schema({
    'username':  String,
    'password': String
});

const UserModel = mongoose.model('User', userSchema);

module.exports.UserModel = UserModel;