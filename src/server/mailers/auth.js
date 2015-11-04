var mailer = require('./mailer');

var sendSignupEmail = function (toAddress, locals) {  
  var options = {
    messageDetails: {
      to: toAddress,
      from: 'Wes Reid <wesley.reid@galvanize.com>',
      subject: 'Thank you for signing up!'  
    },
    template: './src/views/emails/auth/signup.jade',
    locals: locals
  }

  mailer.sendMail(options);
};


var authMailer = {
  sendSignupEmail: sendSignupEmail
}

module.exports = authMailer;