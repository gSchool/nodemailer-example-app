var helpers = {
  auth: {
    isLoggedIn: function (req, res, next) {
      if ( !req.isAuthenticated() ) { res.send(401) }
      else { next() };
    }
  }
}

module.exports = helpers;