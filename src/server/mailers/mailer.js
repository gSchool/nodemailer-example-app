var _             = require('underscore-node');
var fs            = require('fs');
var jade          = require('jade');
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
    var message = ( info && info.response ) ? info.response.toString() : info;
    var resp = err || message;
    console.log(resp);
  }

  this.compileJade = function (template, locals) {
    var content   = fs.readFileSync(template, "utf8");
    var contentFn = jade.compile(content);
    
    return contentFn(locals);
  }

  this.sendMail = function (options) {
    var generatedHTML = this.compileJade(options.template, options.locals);
    var options       = _.extend(options.messageDetails, { html: generatedHTML });

    var transporter = this.createTransporter();
    transporter.use('compile', htmlToText(options.messageDetails));

    transporter.sendMail(options, this.logMessages);
  }
}


module.exports = new Mailer();