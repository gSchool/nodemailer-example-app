var mailer = require('./mailer');

var sendSignupEmail = function (toAddress) {
  var messageOptions = { 
    to: toAddress,
    from: 'Wes Reid <wesley.reid@galvanize.com>',
    subject: 'Thank you for signing up!',
    htmlContent: '<h1>Hurray!</h1><p>You\'re sending emails.</p>'
  };

  mailer.sendMail(messageOptions);
}

var authMailer = {
  sendSignupEmail: sendSignupEmail
}

module.exports = authMailer;