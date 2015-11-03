var _             = require('underscore-node');
var nodemailer    = require('nodemailer');
var sesConfig     = require('../config/amazon-ses');
var sesTransport  = require('nodemailer-ses-transport');
var stubTransport = require('nodemailer-stub-transport');
var htmlToText    = require('nodemailer-html-to-text').htmlToText;

var Mailer = function () {
  this.options = {
    accessKeyId: sesConfig.accessKeyId,
    secretAccessKey: sesConfig.secretAccessKey,
    rateLimit: 5,
    region: 'us-west-2'
  };

  this.createTransporter = function (options) {
    if ( process.env.NODE_ENV === 'development' )
      return nodemailer.createTransport(stubTransport());
    else
      var opt = ( options ) ? _.extend(options, this.options) : this.options;
      return nodemailer.createTransport(sesTransport(opt));
  };

  this.logMessages = function (err, info) {
    var message = ( info.response ) ? info.response.toString() : info;
    var resp = err || message;
    console.log(resp);
  }

  this.sendMail = function (messageOptions) {
    var transporter = this.createTransporter();
    transporter.use('compile', htmlToText(messageOptions));

    transporter.sendMail({
      from:    messageOptions.from,
      to:      messageOptions.to,
      subject: messageOptions.subject,
      text:    messageOptions.textContent,
      html:    messageOptions.htmlContent
    }, this.logMessages);
  }
}

module.exports = new Mailer();