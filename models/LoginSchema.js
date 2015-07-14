var mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    UserName : String,
    UserID : String,
    Password : String,
    Role : String
 });

module.exports = mongoose.model('LoginModel',loginSchema);