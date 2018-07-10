const express = require('express');
const router = express.Router();
var User = require('../models/user.js');
var Venue = require('../models/venue.js');
var Item = require('../models/item.js');
var Bill = require('../models/bill.js');
var Menu = require('../models/menu.js');
var MenuCateogry = require('../models/menuCategory.js');

router.get('/', function (req, res) {
  res.send('api works');
});

//Create new User
router.post('/user/:fullName', function (req, res) {

  var fullName = req.params.fullName;
  var user = new User({
    fullName: fullName
  });

  user.save(function (err, data) {
    if (err) console.log(err);
    console.log(data);
  });

});

//Create new venue
router.post('/venue/:venueName', function (reg, res) {

  var name = req.params.venueName;
  var venue = new Venue({
    name: name
  });
  console.log(venue);
  venue.save(function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });

});

//get all venues
router.get('/getVenues', function (reg, res) {

  Venue.find({}).exec(function (err, venues) {
    res.send(venues);
  })

});

//Item
router.post('/item/:name/:price', function (reg, res) {

  var name = req.params.name;
  var itemPrice = req.params.price;
  var item = new Item({
    name: name,
    price: itemPrice
  });

  item.save(function (err, data) {
    if (err) console.log(err);
    console.log(data);
  });

});

//Menu
router.get('/addMenu', function (req, res) {
  var menu = new Menu({
    MenuCategoryId: ["5b3fc795fa541e4026171a6c"]

  });

  menu.save(function (err, data) {
    if (err) console.log(err);
    console.log(data);
  });
});

router.get('menu/venue/venueId', function (reg, res) {
  var venueID = req.params.venueId;
  Menu.find({
    venueId : venueId
  }).exec(function (err, menu) {
    if (err) throw err;
    res.json({"menue": menu})
  })


});


//MenuCategory

router.get('/addMenuCategory', function (req, res) {
  var menuCategory = new MenuCateogry({
    name: "Steaks",
    items: ["5b3fba6e96255e3e001ef6b8", "5b3fc6bda9f0a03f809fea07", "5b3fc6d4e45ff63f8d3c11c3"]

  });

  menuCategory.save(function (err, data) {
    if (err) console.log(err);
    console.log(data);
  });
});


//Bill

//Start a new bill
router.post('/bill/user/:userId/venue/:venueId', function (req, res) {
  var userId = req.params.userId;
  var venueId = req.params.venueId;
  var bill = new Bill({
    userId:userId,
    venueId:venueId,
    MenuCategoryId: [""]

  });

  bill.save(function (err, data) {
    if (err) console.log(err);
    console.log(data);
  });
});

//Add to an existing bill

//Close a bill

//get all bills for passed venue
router.get('/bills/venue/:venueId', function (req, res) {
  var venueId = req.params.venueId;

  Bill.find({
    venueId: venueId
  }).exec(function (err, bills) {
    if (err) throw err;
    res.json({"bills": bills})

  })

});

//get all bills for passed user
router.get('/bills/venue/:userId', function (req, res) {
  var userId = req.params.userId;

  Bill.find({
    userId: userId
  }).exec(function (err, bills) {
    if (err) throw err;
    res.json({"bills": bills})

  })

});


// Catch all other routes and return no page found
router.get('*', function (req, res) {
  res.send("No page found");
});

module.exports = router;
