
var express = require('express');
var router  = express.Router();//provide the routing functionality in Express
var mongoose = require('mongoose');

//Model
var LoginModel = require('../models/LoginSchema');

//API-----------------------------------------------------------

//to fetch all the posts from db
router.get('/getAllUsers',function (req, res) {
  LoginModel.find({}, function(err, docs){
    res.json(docs);
  });
}); 

//to fetch a post on the basis of project_name
router.get('/getUserByName/:id',function (req, res) {
  LoginModel.find({'UserName' : req.params.id}, function(err, docs){
    if (err) return next(err);
    res.json(docs);   
  });
});

//to create a new post
router.post('/postNewUser',function(req, res,next){
  LoginModel.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//to delete a record from db 
router.delete('/deleteUser/:id',function(req, res) {
  LoginModel.findByIdAndRemove(req.params.id).remove(function(err, docs) {
    res.json(docs);
  });
});

//to reply to a post on message board
router.put('/updateUser/:id',function(req, res, next) {
    LoginModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router; //exporting the routes to make them available in other files 