# Nodemailer Example App

### Step 4

* * *

__SOLUTION:__

The code I added to `app.js` looks like this:

```javascript
// ./src/app.js
// set up environment variables for app use
process.env.NODE_ENV = process.env.NODE_ENV || app.get('env') || 'development';
```

Here's the current code I have inside my `mailer.js`.

```javascript
// ./src/server/mailers/mailer.js
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

var mailer = new Mailer();
mailer.sendMail({ to:             'wesley.reid@galvanize.com',
                  from:           'wesley.reid@galvanize.com',
                  subject:        'Oh, hey girl!',
                  htmlContent:    '<h1>Wow.</h1><p>Such message. Very email.</p>'});
```

* * *

### Sending Emails When a User Signs Up

Now let's send emails (either through the terminal or for realz) when a user signs up. We'll need to prepare our module for export and identify a place where we want to trigger the email being sent.

Additionally, we _could_ add the code for sign up emails directly to our Mailer but what if we want to send more emails in the future? There's huge potential for `mailer.js` to get too crazy once we've added 5 or 10 emails. Let's future proof our code a bit and create a new module that'll handle our auth.

To complete this step, do the following:

1. Export your Mailer as a module.
1. Create a new file: `./src/server/mailers/auth.js`
1. Inside of `auth.js` import your mailer and create a new function (e.g. `sendSignupEmail`) that formats the message options for the signup email and calls `sendEmail` from Mailer. This function should take in one parameter which is going to be the email address we send the email to.
  * You can test out that this is working similar to what we were doing before.
1. Find a place where you want to trigger your email being sent. Include your new `auth.js` file and call the new function you just wrote so that an email gets sent!
  * You'll want to be able to pass in the user email to this new function so that it goes to the right address. Where can you access the user?