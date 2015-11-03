# Nodemailer Example App

### Step 2

* * *

__SOLUTION:__

Here's the code I added inside my `mailer.js`. You can do whatever you want, as long as you have a sendMail function.

```javascript
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
mailer.sendMail({ to:             'wesley.reid@galvanize.com',
                  from:           'wesley.reid@galvanize.com',
                  subject:        'Oh, hey girl!',
                  textContent:    'Wow. Such message. Very email.'});
```

* * *

### Amazon SES

We're going to be sending email using Amazon's SES Service. We'll be using the sandbox mode which means we'll need to validate emails we're sending to but it shouldn't cost us anything.

If you have yet to make an account, do so now. Once you do and are logged in, click on your name in the upper right hand corner and select 'Security Credentials' if you don't already have some. Make sure you're under the following drop down section:
`Access Keys (Access Key ID and Secret Access Key)`

If you do not already have a key, create a new one and SAVE YOUR KEY INFORMATION. This could be to lastpass, 1Password, or take a screenshot. You will not see this secret key again.

Click Amazon's orange box on the toolbar and then locate SES. Take a note of the region you're in (upper left-hand corner). On the left-hand toolbar, hit 'Email Addresses' and add your email. You'll need to verify it by clicking on a link sent in an email. Once verified, you're good to go. Take a short break.

* * *

### Using SES & Nodemailer

You have created an account with Amazon, set up a verified email address in SES, and have your access key and secret key ready; let's DO this!

Do the following on your own.

1. Create a new file: `./src/server/config/amazon-ses.js`. Inside, include the configs for your access key and secret key.
DO NOT COPY AND PASTE YOUR KEYS AS STRING. Take a look at what is happening inside the `database.js` inside the same folder. How do you pass env vars into your build?
1. Back inside of your `mailer.js` require `nodemailer-ses-transport` and your config file.
1. Set up a new property that stores the settings (as an object) for the SES transport.
  * You'll want the following properties inside of your object: `{ accessKeyId: ..., secretAccessKey: ..., rateLimit: 5, region: [your-region]}`
1. Instead of sending with `stubTransport`, send with the SES plugin. You'll need to pass in the options you just defined.
1. Try out your mailer. Again, you can write a function at the bottom of your file and/or copy the code into a repl.