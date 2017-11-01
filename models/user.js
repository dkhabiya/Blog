var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    bcrypt                  = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    created: {type: Date, default: Date.now()},
    blogs : [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Blog"
      }
    ]
});

UserSchema.pre('save', function(next) {
  var user = this;
  
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Get user fullname
UserSchema.methods.getFullName = function() {
  return this.name.firstName + ' ' + this.name.lastName;
}

//compare password in the database and the one that the user types in
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});
UserSchema.index({created: 1});

module.exports = mongoose.model("User", UserSchema);