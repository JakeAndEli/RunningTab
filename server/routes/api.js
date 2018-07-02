const express = require('express');
const router = express.Router();
var User = require('../models/user.js');

router.get('/', function (req, res) {
  res.send('api works');
});

router.get('/users',function(req,res) {


  var user = new User({
    fullName: "eli"
  });

  user.save(function(err,data){
    console.log(data);
  });

  User.find({}).exec(function(err, users){
    res.send(users);

  })

});

// Catch all other routes and return no page found
router.get('*', function(req, res) {
  res.send("No page found");
});

module.exports = router;
