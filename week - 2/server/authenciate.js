var passport = require('passport');
var User = require('./models/user');
var LocalStrategy = require('passport-local');
module.exports = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
