# Nodemailer Example App

### Step 0

We currently have an application with three distinct folders inside of `./src`:

1. __client:__ Our client-side CSS & JS, including all of our angular code
1. __server:__ Our Express-related code including models and our [passport.js](http://passportjs.org/) code.
1. __views:__ The views for our application, using the [jade](http://jade-lang.com/) templating engine. Note that we have angular inside of our views!

Navigate through the file structure to get a sense of how the app is working. Run the application, taking a look at the [main readme](https://github.com/gSchool/nodemailer-example-app/blob/master/readme.md) for instructions. Make sure you have an instance of mongo running and attempt to create and account at `/#/signup`. After signing up, the page it redirects to should say `Yo [youremail]!`.

### Answer the following:

1. What routes will log you in, log you out, and sign you up?
1. Where/how is `$rootScope.currentUser` getting set?
1. If you type 'YOUREMAIL@GMAIL.COM', what should get saved to the database?
1. What are the parameters in the `done()` function inside of [passport.js](https://github.com/gSchool/nodemailer-example-app/blob/master/src/server/config/passport.js#L29)?
1. What are [these lines](https://github.com/gSchool/nodemailer-example-app/blob/master/src/server/routes/index.js#L11-L16) inside of `./src/server/routes/index.js` doing?
1. What is the 'special-page' dummy route demonstrating? What should happen when you're logged in? When you're not?
1. what is `resolve` in the context of an angular route? (For an example, look at the [main.js](https://github.com/gSchool/nodemailer-example-app/blob/master/src/client/main.js) inside the `./src/client` folder.)