# Nodemailer Example App

### Step 6

* * *

__SOLUTION:__

My `mailer/auth.js`

```javascript
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
```

* * *

### Use Jade for Emails & Adding Local Variables

We are now loading our emails from external files, logging emails in development and sending them in other environments, and doing it all modularly. So far, we're doing great!

The last thing you may want to do is pass data into an email itself so that you can provide specific information in the email to your user. This could be as simple as saying 'Hello Wes!' in the subject or as complex as providing user-specific information generated from other parts of your application.

The jade templating engine actually allows us to use variables throughout it's templates... so why not write our emails in jade and pass local variables into the emails? With just a few additions we can do both of these and write data-rich but syntatically simple emails.

To do this, try the following:

1. Create a new jade template file inside of emails: `./src/views/emails/auth/signup.jade`
1. Write a bit of jade in the file and include an `email` variable.
  * You can interpolate variables using the `#{}` format. For example, `p This is a paragraph, #{email}` is valid jade syntax.
1. Take a look at the jade docs and look for the function `jade.compile()`. This will allow us to take jade content and transform it into HTML.
  * Hint: this function actually returns _another_ function that takes an object of variables. (e.g. { name: 'Wes'})
1. Require `jade` in your `mailers/auth.js` and compile your jade, passing in whatever local variables you need. Make sure to change the path to your template as well.

__Stretch Goal:__ We actually can move more code from `mailers/auth.js` into the main `mailer.js` file, including loading and compiling the template. Refactor `auth.js` so that file is as small as possible (within reason).