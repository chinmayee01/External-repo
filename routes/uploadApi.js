var express = require('express');
var multer = require('multer');
var router  = express.Router();
var fs = require('fs');
var done= false;
var fileTooLarge = false;

router.post('/image/:ProjectName', multer({
dest: './public/images/',
changeDest: function(dest, req, res) {
    var newDestination = dest + req.params.ProjectName+'-Images/Dashboard-Images/';
    var stat = null;
    try {
        stat = fs.statSync(newDestination);
    } catch (err) {
        fs.mkdirSync(newDestination);
    }
    if (stat && !stat.isDirectory()) {
        throw new Error('Directory cannot be created at "' + dest + '"');
    }
    return newDestination
},
limits: {
      fileSize: 500000
 },
 rename: function (fieldname, filename) {

    return filename;
  },
 onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
 },
 onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
 }
}), function(req, res) {
  if(done==true){
    console.log(req.file);
    res.send("<html>"+"<head>"+
             "<script>"+
             "function loaded()"+
             "{"+
                  "window.setTimeout(CloseMe, 500);"+
            "}"+

"function CloseMe()"+ 
"{"+
   " window.close();"+
"}"+
"</script>"+
"</head>"+
"<body onLoad='loaded()'>"+
"Done"+
"</body>");
  }
  });

module.exports = router; 