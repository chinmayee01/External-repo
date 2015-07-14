var express = require('express');
var router  = express.Router(); //it provides the routing functionality in Express
var mongoose = require('mongoose');

//Model
var ExternalSiteModel = require('../models/ExternalSiteMainSchema');

//API----------------------------------------------------------
//to create a new record in db
router.post('/postExternalProject', function(req, res){
  ExternalSiteModel.create(req.body, function (err, post) {
    if(err) return next(err); // if there is an error in posting, return the error
    res.json(post); //return a record in json format
    
  });
  });

//to fetch all the records from db
router.get('/getExternalProject',function (req, res) {
  ExternalSiteModel.find({}, function(err, docs){
    if(err) return next(err);
    res.json(docs);   
  });
}); 


//to get a specific record from db
router.get('/getExternalProjectByName/:id',function (req, res) {
  ExternalSiteModel.find({'Project_Name' : req.params.id}, function(err, docs){
    if (err) return next(err);
    res.json(docs);   
  });

}); 

//ADMIN------- to get a specific record from db
router.get('/adminGetExternalProjectByName/:id',function (req, res) {
  ExternalSiteModel.findOne({'Project_Name' : req.params.id}, function(err, docs){
    if (err) return next(err);
    res.json(docs);   
  });

}); 


//to delete a record from db on the basis of its object_id
router.delete('/deleteExternalProject/:id',function(req, res) {
  ExternalSiteModel.findByIdAndRemove(req.params.id).remove(function(err, docs) {
    res.json(docs);
  });
});

//to update a record in db on the basis of its object_id
router.put('/updateExternalProject/:id',function(req, res, next) {
    ExternalSiteModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if(err) return next(err);
     res.json(post);
  });
});

module.exports = router; //exporting the routes to make them available in other files.