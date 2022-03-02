var express = require("express");
var router = express.Router();
var passport = require('passport');
var authenciate = require('../authenciate.js');
var User = require("../models/user");
function validateBody(body, reqParams) {
  for (param of reqParams) {
    if (body[param] === undefined) {
      var res = `${param} `;
      return res;
    }
  }
  return true;
}
/* POST users listing. */
router.post("/signup", async function (req, res, next) {
  var isValidUser = validateBody(req.body, ["username", "password"]);
  if (isValidUser === true) {
    var username = req.body.username;
    var password = req.body.password;
    User.register({ username: username }, password, function (err, user) {
      if (err) { console.log(err); return next(err); }

      const authenticate = User.authenticate();
      authenticate(username, password, function (err, result) {
        if (err) { console.log('error'); return err; }
        console.log(result);
        return res.json({ success: true, status: 'new account created successfully' });
        // Value 'result' is set to false. The user could not be authenticated since the user is not active
      });
    });
  } else {
    res.statusCode = 400;
    return res.json({ status: `${isValidUser} is required` });
  }
});
router.post("/login", passport.authenticate('local'), async function (req, res, next) {
  //  passport.authenticate('local', (err,res)=>{
  //   if(err) console.log(err);
  //   else console.log(res);
  // });
  // console.log(auth);
  // var isValidUser = validateBody(req.body, ["username", "password"]);
  // if (isValidUser === true) {
  //   if (req.session.username) {
  //     // session is present for the user
  //     //var dbUser = await User.findOne({ username: req.session.username});
  //     res.statusCode = 200;
  //     res.json({
  //       status: "logged in successfully!",
  //       details: {
  //         username: req.session.username,
  //         password: req.session.password,
  //       }
  //     });
  //     next();
  //   } else {
  //     var username = req.body.username;
  //     var password = req.body.password;

  //     var dbUser = await User.findOne({ username: username });
  //     console.log("db user find result is ");
  //     console.log(dbUser);
  //     if (dbUser) {
  //       // user exists ;
  //       // check username and password;
  //       if (dbUser.username === username && dbUser.password === password) {
  //         // stores username in the session
  //         req.session.username = username;
  //         req.session.password = password;
  //         res.json({
  //           status: "logged in successfully!",
  //           details: dbUser,
  //         });
  //         next();
  //       } else {
  //         // password is wrong;
  //         var err = new Error(`Wrong Password`);
  //         res.statusCode = 403;
  //         return next(err);
  //       }
  //       var err = new Error(
  //         `user alreday exist with username ${dbUser.username}`
  //       );
  //       res.statusCode = 403;
  //       return next(err);
  //     } else {
  //       // account doesn't exist;
  //       var err = new Error(
  //         `Account Doesn't exist with username ${req.body.username}}`
  //       );
  //       res.statusCode = 403;
  //       return next(err);
  //     }
  //   }
  // } else {
  //   // error from client side;
  //   res.statusCode = 400;
  //   res.end(`${isValidUser}`);
  // }
  res.statusCode = 200;
  res.json({
    status: "logged in successfully!"
  });
  return;
  //next();
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
    next();
  }
})
module.exports = router;
