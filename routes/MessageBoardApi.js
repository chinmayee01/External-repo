
var express = require('express');
var router  = express.Router();//provide the routing functionality in Express
var mongoose = require('mongoose');

//Model
var MessageBoardModel = require('../models/MessageBoardSchema');

//API-----------------------------------------------------------

//to fetch all the posts from db
router.get('/getMessageBoardPosts',function (req, res) {
  MessageBoardModel.find({}, function(err, docs){
    res.json(docs);
  });
}); 

//to fetch a post on the basis of project_name
router.get('/getExternalProjectByName/:id',function (req, res) {
  ExternalSiteModel.find({'Project_Name' : req.params.id}, function(err, docs){
    if (err) return next(err);
    res.json(docs);   
  });
});

//to create a new post
router.post('/postMessageBoardPosts',function(req, res,next){
  MessageBoardModel.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//to delete a record from db 
router.delete('/deleteMessageBoardPosts/:id',function(req, res) {
  MessageBoardModel.findByIdAndRemove(req.params.id).remove(function(err, docs) {
    res.json(docs);
  });
});

//to reply to a post on message board
router.put('/updateMessageBoardPosts/:id',function(req, res, next) {
    MessageBoardModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router; //exporting the routes to make them available in other files 