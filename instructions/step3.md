# Nodemailer Example App

### Step 3

* * *

__SOLUTION:__

The config code I added looks like this:

```javascript
// ./src/server/config/amazon-ses.js
module.exports = {
  accessKeyId: process.env.AMAZON_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SES_SECRET_ACCESS_KEY
}
```

Here's the current code I have inside my `mailer.js`.

```javascript
// ./src/server/mailers/mailer.js
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
    var message = ( info.response ) ? info.response.toString() : info;
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
mailer.sendMail({ to:             'wesley.reid@galvanize.com',
                  from:           'wesley.reid@galvanize.com',
                  subject:        'Oh hey girl',
                  textContent:    'Wow. Such message. Very email.'});
```

* * *

### Development vs Other Environments

When we're testing out sending emails, we probably don't _actually_ want to keep sending emails to ourselves. The `stubTransport` plugin is super useful for giving us an idea of what is happening while we're in development. Let's set up our mailer so that it'll stub out the emails when our environment is 'development' and otherwise send emails.

1. We can set environment variables when our app is getting set up that we can then use throughout the app; although we should be careful about how much we do this. Set a new environment variable that tells us what environment is being run.
  * We are getting the environment already in app.js! We could simply set this to a new env var for use in other parts of the app.
1. Add a new function to our Mailer that returns the correct transport depending on what the environment is. In this case, we're only checking for whether or not we're in development mode; for anything else, we'll use SES.
1. Finally, it'd be nice to just write HTML instead of having to have two separate versions. Require the `nodemailer-html-to-text` plugin and, before we send the email, compile a text version. Check the docs on this for a description of how to do it.

In making this change, remember that to test this by just running the file you'll need to manually set the env var.
