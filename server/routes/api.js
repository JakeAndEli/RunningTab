const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config/database-config');

router.get('/', function (req, res) {
  res.send('api works');
});

router.post('/register',function(req,res) {
  var user = new User();

  //user.fullName = req.body.fullName;
  user.username = req.body.username;
  User.setPassword(user, req.body.password);

  user.save(function(err) {
    if(err) {
      throw err;
    }
    const token = jwt.sign(user.toJSON(), config.secret, {});
    return res.json({
      success: true,
      token: 'JWT ' + token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username
      }
    });
  });
});

router.post('/authenticate', function(req,res){
  var username = req.body.username;
  var password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) {
      throw err;
    }
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    if(User.validPassword(user, password)) {
      const token = jwt.sign(user.toJSON(), config.secret, {});
      return res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username
        }
      });
    } else {
      return res.json({success: false, msg: 'Wrong password'});
    }

  });
});

// Catch all other routes and return no page found
router.get('*', function(req, res) {
  res.send("No page found");
});

module.exports = router;
