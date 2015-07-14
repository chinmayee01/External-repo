/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');

// create a new express server
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan   = require('morgan');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var LoginModel = require('./models/LoginSchema');

//To allow Cross Origin Resource Sharing 
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Credentials', 'true');
    return next();
  }); 

app.use(session({ secret: 'keyboard cat',saveUninitialized: true,
                 resave: true }));
app.use(cookieParser());


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ 'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

//MongoDB
var mongoUrl;

if(process && process.env && process.env.VCAP_SERVICES) {
  var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
  for (var svcName in vcapServices) {
    if (svcName.match(/^mongo.*/)) {
      mongoUrl = vcapServices[svcName][0].credentials.uri;
      mongoUrl = mongoUrl || vcapServices[svcName][0].credentials.url;
      break;
    }
  }
}
else {
  mongoUrl = "127.0.0.1:27017/extrnalSitedb";
}
mongoose.connect(mongoUrl);//connecting to the database

app.use(morgan('dev')); // log every request to the console


// ROUTES FOR API==============================
app.use('/api',require('./routes/ExternalSiteServices'));
app.use('/msg',require('./routes/MessageBoardApi'));
app.use('/loginApi',require('./routes/LoginApi'));
app.use('/upload',require('./routes/uploadApi'));

app.get('/login',function (req, res) {
  res.sendfile('./public/Login.html');

}); 

var sess;

app.post('/',function (req, res) {
  var userid = req.body.cbsuser;
  var password = req.body.cbspwd;

sess = req.session;

console.log(userid);

  LoginModel.find({$and : [{'UserID': userid},{'Password' : password}]}, function(err, docs){
    if(err) return next(err);
    if(docs != ""){  
      sess.email = userid;
       
      res.redirect('/');
      }else{
      res.send("User Not Found");
    }
   
  });
});

app.get('/',function (req, res) {
 sess=req.session;

  if(sess.email){
   res.sendfile('./public/index.html');
   }
   else{
    
     res.redirect('/login');
   }

});
                

  app.get('/logout',function(req, res) {
       req.session.destroy(function(err){
           if(err) {
            console.log(err);
          }
        else{
         res.sendfile('./public/logout.html');   

         }
                                                   
  }); 
  
 });

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {

  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


