var mongoose = require('mongoose');

var messageBoardSchema = new mongoose.Schema({
  Project_Name:String,
    Post : {
        Content : String, //content of the post
        date : Date,
        Login_id : String,
        Reply : [{
          Content : String, //reply to the post
          date : Date,
          Login_id : String
        }]
    }
 });

module.exports = mongoose.model('MessageBoardModel',messageBoardSchema);