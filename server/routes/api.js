const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Venue = require('../models/venue.js');
const Item = require('../models/item.js');
const Bill = require('../models/bill.js');
const Menu = require('../models/menu.js');
const MenuCateogry = require('../models/menuCategory.js');
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
        venueMenu: venue.menuId
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
          name: user.name,
          username: user.username
        }
      });
    } else {
      return res.json({success: false, msg: 'Wrong password'});
    }
  });
});


router.get('/user/:userId', function (req, res) {
  var userId = req.params.userId;

  User.getUserById(userId, (err, bill) => {
    if (err) {
      throw err;
    }
    else {
      res.json({bill: bill});
    }
  });

});

router.post('/changepass/:userId/:password', function (req, res) {
  var userId = req.params.userId;
  var password = req.params.password;
  var user = {
    _id: userId,
    newPassword: password
  };

  User.updatePassword(user);

});


//Item
router.post('/item/:name/:price', function (req, res) {
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

//Add menu category to menu
router.post('/menu/:menuId/:categoryId', function (req, res) {
  var menuId = req.params.menuId;
  var categoryId = req.params.categoryId;

  var menuCategory = {
    menuId: menuId,
    category: categoryId
  };
  Menu.addMenuCategory(menuCategory);

})

//get full menu from venueId
router.get('/fullMenu/:venueId', function (req, res) {
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


//Get menu from venueId
router.get('/menu/venue/:venueId', function (req, res) {
  var venueId = req.params.venueId;
  Menu.getMenuByVenueId(venueId, (err, menu) => {
    if (err) {
      throw err;
    }
    else {
      res.json({menu: menu});
    }

  });

});


//Start a new bill
router.post('/bill/user/:userId/venue/:venueId', function (req, res) {
  var userId = req.params.userId;
  var venueId = req.params.venueId;
  var bill = {
    userId: userId,
    venueId: venueId
  };
  Bill.createBill(bill);

});

//Add an item to an existing bill
router.post('/addToBill/:bill/:item', function (req, res) {
  var id = req.params.bill;
  var item = req.params.item;
  var bill = {
    _id: id,
    item: item
  };

  Bill.addItemToBill(bill);
});


//Remove an item to an existing bill
router.post('/removeItemFromBill/:bill/:item', function (req, res) {
  var id = req.params.bill;
  var item = req.params.item;
  var bill = {
    _id: id,
    item: item
  };

  Bill.removeItemFromBill(bill);
});

//Close a bill
router.post('/closeBill/:bill', function (req, res) {
  var id = req.params.bill;
  var bill = {
    _id: id
  };
  Bill.closeBill(bill);

});


//get all bills for passed venue
router.get('/bills/venue/:venueId', function (req, res) {
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

//get all bills for passed user
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


// Catch all other routes and return no page found
router.get('*', function (req, res) {
  res.send("No page found");
});

module.exports = router;
