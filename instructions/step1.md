# Nodemailer Example App

### Step 1

* * *

__ANSWERS:__

1. What routes will log you in, log you out, and sign you up?
  * `/#/login`, `/#/logout`, and `/#/signup`
1. Where/how is `$rootScope.currentUser` getting set?
  * `./src/client/services/authService.js:14`
1. If you type 'YOUREMAIL@GMAIL.COM', what should get saved to the database?
  * youremail@gmail.com, the user model has `lowercase : true` set on the attribute email
1. What are the parameters in the `done()` function inside of [passport.js](https://github.com/gSchool/nodemailer-example-app/blob/master/src/server/config/passport.js#L29)?
  * The first argument is where errors are passed that will throw 500s. The second is either `false` or the user; it essentially lets the following functions now if the user was found. The final argument is the message or info that gets sent back. We can use this to display specific messages about what's happening while logging in.
1. What are [these lines](https://github.com/gSchool/nodemailer-example-app/blob/master/src/server/routes/index.js#L11-L16) inside of `./src/server/routes/index.js` doing?
  * Setting up our jade partials! Angular requests tempaltes from these routes and we send back the correct partial, depending on the parameter arguments. The question mark on partial (i.e. `:partial?`) means it's optional.
1. What is the 'special-page' dummy route demonstrating? What should happen when you're logged in? When you're not?
  * This is just a way for us to demonstrate that our app can redirect when a user is logged in.
1. what is `resolve` in the context of an angular route? (For an example, look at the [main.js](https://github.com/gSchool/nodemailer-example-app/blob/master/src/client/main.js) inside the `./src/client` folder.)
  * the resolve function runs before the route is reached. If the promise inside resolves, it will continue. If it doesn't, it will not complete.

* * *

### Trying out Nodemailer

Take a look at your `package.json` file. You should already have the following plugins installed:

```
    "nodemailer": "^1.8.0",
    "nodemailer-html-to-text": "^1.0.2",
    "nodemailer-ses-transport": "^1.3.0",
    "nodemailer-stub-transport": "^1.0.0",
```

For now, we're just going to use `nodemailer` and `nodemailer-stub-transport` to test out mailing. Open up the docs for [Nodemailer](https://github.com/andris9/Nodemailer) as we work through this.

Open up a repl -- that is, open up your terminal and just type `node`. Then, do the following:

```
> var nodemailer = require('nodemailer');
undefined
> var stubTransport = require('nodemailer-stub-transport');
undefined
> var transport = stubTransport();
undefined
> var transporter = nodemailer.createTransport(transport);
undefined
```

* * *

### On Your Own

We now have our transporter set up and are ready to send mail. The function `transporter.sendMail` takes an object determing the contents of the message. What do we need to set?

1. Pass in the message contents to the function sendMail (eg. `transporter.sendMail(options)`). What happens?
1. sendMail takes a callback. Write an anonymous function that console.logs any errors and/or the response.
  * Hint: for the response, try `info.response.toString()`.

Now you're sending email with Nodemailer!... to your terminal. Let's set up a structure so that when we're ready to really send emails, we can do so within our application.

1. Create a new folder inside of the server directory: `./src/server/mailers`
1. Create a new file: `./src/server/mailers/mailer.js`
1. Create a new object inside of the `mailer.js` file called (surprise!) `Mailer`. Mailer should have a sendMail function that takes one argument which is an object full of options. It should then send mail in the same way we've just demonstrated.
1. Create an additional function that is the callback to sendMail. This function should simply log the available messages. (Check the documentation for more information!)
  * In order to test your file, you can either copy the contents into a repl or run `node /path/to/your/file.js`. For the latter, you'll need to include an example on the bottom of the page.