const nodemailer = require("nodemailer");
require('dotenv').config()

const sendEmail = async (email, subject, text) => {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.HOST}`,
      pass: `${process.env.PASS}`
    }
  });
  
  var mailOptions = {
    from: `${process.env.HOST}`,
    to: email,
    subject: subject,
    text: text     
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}
module.exports = sendEmail;

