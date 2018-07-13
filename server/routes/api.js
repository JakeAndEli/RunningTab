const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Venue = require('../models/venue.js');
const Item = require('../models/item.js');
const Bill = require('../models/bill.js');
const Menu = require('../models/menu.js');
const MenuCategory = require('../models/menuCategory.js');
const jwt = require('jsonwebtoken');
const config = require('../config/database-config');
const passport = require('passport');

router.get('/', function (req, res) {
  res.send('api works');
});

router.post('/register', function (req, res) {
  var isAdmin = req.body.isAdmin;

  var user = new User();
  //user.fullName = req.body.fullName;
  user.username = req.body.username;
  User.setPassword(user, req.body.password);
  user.admin = isAdmin;

  if (isAdmin) {
    var venue = new Venue();
    venue.venueName = req.body.venueName;
    venue.venueTownCity = req.body.venueTownCity;
    venue.venueState = req.body.venueState;

    var menu = new Menu();
    menu.save(function (err) {
      if (err) {
        throw err;
      } else {
        console.log("Created Menu.")
      }
    });

    venue.menuId = menu.id;

    venue.save(function (err) {
      if (err) {
        throw err;
      } else {
        console.log("Created Venue.")
      }
    });
    user.venue = venue.id;
  }

  user.save(function (err) {
    if (err) {
      throw err;
    }
    const token = jwt.sign(user.toJSON(), config.secret, {});
    return res.json({
      success: true,
      token: 'JWT ' + token,
      user: {
        id: user._id,
        name: user.fullName,
        username: user.username,
        admin: user.admin,
        venueId: user.venue
      }
    });
  });
});

router.post('/authenticate', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    if (User.validPassword(user, password)) {
      const token = jwt.sign(user.toJSON(), config.secret, {});
      return res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          name: user.fullName,
          username: user.username,
          admin: user.admin,
          venueId: user.venue
        }
      });
    } else {
      return res.json({success: false, msg: 'Wrong password'});
    }
  });
});

// Create new User
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

// Create new Venue
router.post('/venue/:venueName', function (req, res) {
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

// Get all Venues
router.get('/getVenues', function (req, res) {
  Venue.find().exec(function (err, venues) {
    res.send(venues);
  });
});

// Create and add Menu Category to Menu
router.post('/venue/:venueId/menuCategory/:name', function(req, res) {
  var name = req.params.name;
  var venueId = req.params.venueId;
  var data = {
    name: name,
    venueId: venueId
  };
  MenuCategory.create(data, (err) => {
    if (err) throw err;
    else {
     res.json({success: true});
    }
  });
});

// Get full Menu from venueId
router.get('/fullMenu/:venueId', function (req,res) {
  var venueId = req.params.venueId;
  Venue.getFullMenuByVenueId(venueId, (err, venue) => {
    if (err) {
      throw err;
    }
    else {
      res.json({venue: venue});
    }
  });
});

// Create Bill
router.post('/bill/user/:userId/venue/:venueId', function (req, res) {
  var userId = req.params.userId;
  var venueId = req.params.venueId;
  var bill = {
    userId: userId,
    venueId: venueId
  };
  Bill.create(bill);
});

// Add an item to a bill
router.post('/addToBill/:bill/:item', function (req, res) {
  var id = req.params.bill;
  var item = req.params.item;
  var bill = {
    id: id,
    item: item
  };
  Bill.addItemToBill(bill);
});


// Remove an item from bill
router.post('/removeItemFromBill/:bill/item/:item', function (req, res) {
  var id = req.params.bill;
  var item = req.params.item;
  var bill = {
    id: id,
    item: item
  };
  Bill.removeItemFromBill(bill);
});

// Close a bill
router.post('/closeBill/:bill', function (req, res) {
  var id = req.params.bill;
  Bill.closeBill(id);
});

// Get all Bills for venueId
router.get('/bills/:venueId', function (req, res) {
  var venueId = req.params.venueId;

  Bill.getBillsByVenueId(venueId, (err, bill) => {
    if (err) {
      throw err;
    }
    else {
      res.json({bill: bill});
    }
  });
});

// Get all Bills for userId
router.get('/bills/user/:userId', function (req, res) {
  var userId = req.params.userId;

  Bill.getBillsByUserId(userId, (err, bill) => {
    if (err) {
      throw err;
    }
    else {
      res.json({bill: bill});
    }
  });
});

// Create Item
router.post('/item/:name/price/:price', function (req, res) {
  var name = req.params.name;
  var price = req.params.price;
  var item = {
    name: name,
    price: price
  };
  Item.create(item, (err, item) => {
    if (err) {
      throw err;
    }
    else {
      res.json({item: item});
    }
  });
});

// Create Item and add it to MenuCategory
router.post('/item/:itemId/menuCategory/:menuCategoryId', function (req, res) {
  var itemId = req.params.itemId;
  var menuCategoryId = req.params.menuCategoryId;
  var data = {
    itemId: itemId,
    menuCategoryId: menuCategoryId
  };
  MenuCategory.addItem(data, (err, menuCategory) => {
    if (err) {
      throw err;
    }
    else {
      res.json({menuCategory: menuCategory});
    }
  });
});

// Catch all other routes and return no page found
router.get('*', function (req, res) {
  res.send("No page found");
});

module.exports = router;
