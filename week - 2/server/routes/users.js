const e = require("express");
var express = require("express");
var router = express.Router();
var User = require("../models/users");
function validateBody(body, reqParams) {
  for (param of reqParams) {
    if (body[param] === undefined) {
      var res = `${param} is required`;
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

    var dbUser = await User.findOne({ username: username });
    console.log("db user find result is ");
    console.log(dbUser);
    if (dbUser) {
      // user alreday exists;
      var err = new Error(
        `user alreday exist with username ${dbUser.username}`
      );
      res.statusCode = 403;
      return next(err);
    } else {
      // create the account;
      try{
      var dbResult = await User.create({
        username: username,
        password: password,
      });
        // stores username in the session
        req.session.username = username;
        req.session.password = password;
      res.json({
        status: "Account created successfully!",
        details: dbResult,
      });
    }catch(e){
      res.json({error:e, message: 'error occured'});
    }
    }
  } else {
    res.statusCode = 400;
    res.end(`${isValidUser} is required`);
  }
});
router.post("/login", async function (req, res, next) {
  var isValidUser = validateBody(req.body, ["username", "password"]);
  if (isValidUser === true) {
    if (req.session.username) {
      // session is present for the user
      //var dbUser = await User.findOne({ username: req.session.username});
      res.statusCode = 200;
      res.json({
        status: "logged in successfully!",
        details: {
          username: req.session.username,
          password: req.session.password,
        }
      });
      next();
    } else {
      var username = req.body.username;
      var password = req.body.password;

      var dbUser = await User.findOne({ username: username });
      console.log("db user find result is ");
      console.log(dbUser);
      if (dbUser) {
        // user exists ;
        // check username and password;
        if (dbUser.username === username && dbUser.password === password) {
          // stores username in the session
          req.session.username = username;
          req.session.password = password;
          res.json({
            status: "logged in successfully!",
            details: dbUser,
          });
          next();
        } else {
          // password is wrong;
          var err = new Error(`Wrong Password`);
          res.statusCode = 403;
          return next(err);
        }
        var err = new Error(
          `user alreday exist with username ${dbUser.username}`
        );
        res.statusCode = 403;
        return next(err);
      } else {
        // account doesn't exist;
        var err = new Error(
          `Account Doesn't exist with username ${req.body.username}}`
        );
        res.statusCode = 403;
        return next(err);
      }
    }
  } else {
    // error from client side;
    res.statusCode = 400;
    res.end(`${isValidUser}`);
  }
  next();
});

router.get('/logout', (req,res,next)=>{
   if(req.session){
     req.session.destroy();
     res.clearCookie('session-id');
     res.redirect('/');
     next();
   }
})
module.exports = router;
