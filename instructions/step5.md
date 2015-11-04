# Nodemailer Example App

### Step 5

* * *

__SOLUTION:__

The code I added to `mailer.js` was simply:

```javascript
// ./src/server/mailers/mailer.js
module.exports = new Mailer();
```

My `auth.js` looks like this:

```javascript
// ./src/server/mailers/auth.js
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
```

I chose to add the trigger inside of the `passport.js` file. This gives me access to the entire user.

```javascript
// ./src/server/config/passport.js
// signup
var signupUser = function (req, email, password, done) {
  User.findOne({ 'email': email }, function (err, user) {
    if ( err )  { return done(err) }; // Throws 500
    if ( user ) { return done(null, false, { error: 'An account with this email already exists.'})};

    var newUser = new User();
    newUser.email = email;
    newUser.password = newUser.generateHash(password);

    newUser.save(function (err) {
      if ( err ) { throw err; }

      mailer.sendSignupEmail(email);
      return done(null, newUser);
    });
  });
}
```

* * *

### Loading HTML & Converting to Text

Emails are being sent! Signups are happening! It's a miracle! (jk we're just kewl)

HTML Emails can get pretty crazy -- everything inside of an HTML email is usually included inline and written in tables. This is probably _not_ something we want inside of a `.js` file. We can use node's `fs` module to read in files and output the content as a string. Try it out in a repl!

```
> var fs = require('fs');
undefined
> fs.readFileSync('./relative/path/to/your/email.html', encoding="utf8")
'<h1>Nice!</h1>\n<p>You loaded an html file that got outputted as a string.</p>'
```

With this knowledge, do the following:

1. Create a new directory and file in your views: `./src/views/emails/auth/signup.html`
1. Add some HTML to your new file.
1. Inside of `auth.js`, load the file in place of the string you previously wrote.