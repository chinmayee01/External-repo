var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "priyaa.kapoor92@gmail.com",
       pass: ""
   }
});

var mailOptions = {
   from: "priyaa.kapoor92@gmail.com", // sender address
   to: "priya.nextgen92@gmail.com", // comma separated list of receivers
   subject: "Hello", // Subject line
   text: "Hello world" // plaintext body
}

smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});
