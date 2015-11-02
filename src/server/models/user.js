var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var User = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});


// Methods
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(user, password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', User);