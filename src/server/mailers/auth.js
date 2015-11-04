var fs     = require('fs');
var mailer = require('./mailer');

var sendSignupEmail = function (toAddress) {
  var messageOptions = { 
    to: toAddress,
    from: 'Wes Reid <wesley.reid@galvanize.com>',
    subject: 'Thank you for signing up!',
    htmlContent: fs.readFileSync('./src/views/emails/auth/signup.html', encoding="utf8")
  };

  mailer.sendMail(messageOptions);
}

var authMailer = {
  sendSignupEmail: sendSignupEmail
}

module.exports = authMailer;