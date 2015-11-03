var nodemailer    = require('nodemailer');
var sesConfig     = require('../config/amazon-ses');
var sesTransport  = require('nodemailer-ses-transport');
var stubTransport = require('nodemailer-stub-transport');

var Mailer = function () {
  this.options = {
    accessKeyId: sesConfig.accessKeyId,
    secretAccessKey: sesConfig.secretAccessKey,
    rateLimit: 5,
    region: 'us-west-2'
  };

  this.logMessages = function (err, info) {
    var message = ( info && info.response ) ? info.response.toString() : info;
    var resp = err || message;
    console.log(resp);
  }

  this.sendMail = function (messageOptions) {
    var transporter = nodemailer.createTransport(sesTransport(this.options));

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