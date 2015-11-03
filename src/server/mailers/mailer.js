var nodemailer    = require('nodemailer');
var stubTransport = require('nodemailer-stub-transport');

var Mailer = function () {
  this.logMessages = function (err, info) {
    var resp = err || info.response.toString();
    console.log(resp);
  }

  this.sendMail = function (messageOptions) {
    var transporter = nodemailer.createTransport(stubTransport());

    transporter.sendMail({
      from:    messageOptions.from,
      to:      messageOptions.to,
      subject: messageOptions.subject,
      text:    messageOptions.textContent,
      html:    messageOptions.htmlContent
    }, this.logMessages);
  }
}

var mailer = new Mailer();
mailer.sendMail({ to:      'wesley.reid@galvanize.com',
                  from:    'wesley.reid@galvanize.com',
                  subject: 'Oh hey girl',
                  textContent:    'Wow. Such message. Very email.'});