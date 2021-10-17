var express = require("express");
const Token = require("../models/Tokenmodel");
var router = express.Router();
var bcrypt = require("bcrypt");
const User = require("../models/userModel");
var jwt = require("jsonwebtoken");
var sendEmail = require("../utils/Sendmail");
require("dotenv").config();

function middleware(req, res, next) {
  let token = req.headers.authorization;
  
  if (token) {
    // decode the token and take the user_id
    var tokenCorrect = jwt.verify(
      token,
      "#Csgj/PD5%+VZIOD",
      function (err, decoded) {
        if (err) {
          res.json({
            message: "Internal Server Error..!!",
          });
        }
        req.user_id = decoded._id;
        next();
      }
    );
  } else {
    res.json({
      message: "No Token Present..!!",
    });
  }
}

/* GET users listing. */
router.post("/register", async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.newUser.password, salt);
  req.body.newUser.password = hash;

  const user = new User({
    firstName: req.body.newUser.firstName,
    lastName: req.body.newUser.lastName,
    _id: req.body.newUser.email,
    password: req.body.newUser.password,
  });

  try {
    var response = await user.save();

    res.json({
      message: "Successful Registration..!!",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.post("/forgetPassword", async (req, res, next) => {
  let token =""
  try {
    let user = await User.findOne(
      { _id: req.body.id },
      { firstName: 0, lastName: 0 }
    );

    if (user) {
      //user found then generate a token and send in mail and save it in db for checking in future
      try {
        let userToken = await Token.findOne(
          { _id: req.body.id },
          { token:1,_id:0}
        );
        if(userToken.token)
        {
          token = userToken.token
          console.log("im from already exited token")
  
        }
      } catch (error) {
        token = jwt.sign({ _id: req.body.id }, "#Csgj/PD5%+VZIOD");
        const userToken = new Token({
          _id: req.body.id,
          token: token,
        }).save();
        console.log("im from new token")
        
      }
      const link = `${process.env.BASE_URL}/users/password-reset/${user._id}/${token}`;
      await sendEmail(user._id, "Password reset", link);
      res.send("password reset link sent to your email account");

    } else {
      res.send("user Not Found..!!");
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let user = await User.findOne(
      { _id: req.body.id },
      { fisrName: 0, lastName: 0 }
    );

    if (user) {
      let comparePassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
console.log(comparePassword)
      if (comparePassword) {
        //generate Token..
        let token = jwt.sign({ _id: req.body.id },"#Csgj/PD5%+VZIOD");
        res.json({
          token,
          message: "Login Successful",
        });
      } else {
        res.json({
          message: "Passwords did not match..!!",
        });
      }
    } else {
      res.json({
        message: "User Not found..!!",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.post("/password-reset/:userId/:token", async (req, res) => {
  const userId = req.params.userId;
  const token = req.params.token;
  const password = req.body.password;
  console.log(token)
  try {
    let user = await Token.findOne({ _id: userId });
    if (user) {
      let compareToken = (user.token == token)
      console.log(compareToken)
      if (compareToken) {
        // change the password of the user..
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        req.body.password = hash;
        let passChange = await User.findByIdAndUpdate(
          { _id: userId },
          { password: req.body.password }
        );
        res.json({
          message: "Password changed..!!",
        });
      }
    }
  } catch (error) {
    console.log(error)
    res.send(error);

  }
});

module.exports = router;
