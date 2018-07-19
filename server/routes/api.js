const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const User = require('../models/user.js');
const Venue = require('../models/venue.js');
const Item = require('../models/item.js');
const Tab = require('../models/tab.js');
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
  user.fullName = req.body.fullName;
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

  QRCode.toDataURL(user.id, function (err, url) {
    if (err) throw err;
    else {
      user.qrCode = url;
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
            fullName: user.fullName,
            username: user.username,
            admin: user.admin,
            venueId: user.venue,
            qrCode: user.qrCode
          }
        });
      });
    }
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
          fullName: user.fullName,
          username: user.username,
          admin: user.admin,
          venueId: user.venue,
          qrCode: user.qrCode
        }
      });
    } else {
      return res.json({success: false, msg: 'Wrong password'});
    }
  });
});

// Change password based on userId
router.post('/changePassword', function (req, res) {
  var userId = req.body.userId;
  var password = req.body.password;
  var user = {
    _id: userId,
    newPassword: password
  };
  User.updatePassword(user);
});

// Get User Info
router.get('/user/:userId', function (req,res) {
  var userId = req.params.userId;
  User.getUserById(userId,function (err,user) {
    if(err)
      throw err;
    else
      res.send(user);
  })
});

// Check for duplicate user
router.get('/checkForUserName/:username', function (req,res) {
  var username = req.params.username;
  User.getUserByUsername(username, function (err,user) {
    if(err) throw err;
    if(user != null) {
      res.json({exists: true})
    }
    else {
      res.json({exists: false})
    }
  })
});

// Get all Venues
router.get('/getVenues', function (req, res) {
  Venue.find().exec(function (err, venues) {
    res.send(venues);
  });
});

// Create Menu Category and add it to Menu
router.post('/menuCategory', function(req, res) {
  var name = req.body.name;
  var venueId = req.body.venueId;
  var data = {
    name: name,
    venueId: venueId
  };
  MenuCategory.create(data, (menuCategory) => {
     res.json({
       success: true,
       menuCategoryId: menuCategory.menuCategoryId
     });
  });
});

// Create Item and add it to MenuCategory
router.post('/item', function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var menuCategoryId = req.body.menuCategoryId;
  var data = {
    itemName: name,
    itemPrice: price,
    menuCategoryId: menuCategoryId
  };
  Item.create(data, (item) => {
    res.json({
      success: true,
      itemId: item.itemId
    });
  });
});

// Remove Item from both Menu Category and Item collection
router.post('/removeItem', function(req, res) {
  var itemId = req.body.itemId;
  var menuCategoryId = req.body.menuCategoryId;
  var data = {
    itemId: itemId,
    menuCategoryId: menuCategoryId
  };
  MenuCategory.deleteItem(data, () => {
    Item.deleteItem(itemId, () => {
      res.json({success: true});
    });
  });
});

// Remove Menu Category and all the Items that belong to it
router.post('/removeMenuCategory', function(req, res) {
  var menuId = req.body.menuId;
  var menuCategoryId = req.body.menuCategoryId;
  MenuCategory.deleteMenuCategory(menuCategoryId, (items) => {
    for(var i = 0; i < items.length; i++) {
      Item.deleteItem(items[i], () => {});
    }

    var data = {
      menuId: menuId,
      menuCategoryId: menuCategoryId
    };

    Menu.removeMenuCategory(data, () => {
      res.json({
        success: true
      })
    })
  })
});

// Get Full Menu from venueId
router.get('/fullMenu/:venueId', function (req,res) {
  var venueId = req.params.venueId;
  Venue.getFullMenuByVenueId(venueId, (err, venue) => {
    if (err) throw err;
    else {
      res.json({
        success: true,
        venue: venue
      });
    }
  });
});

// Get Venue Info
router.get('/venue/:venueId',function(req,res) {
  var VenueId = req.params.venueId;

  Venue.getVenueById(VenueId, (err, venue) => {
    if (err) throw err;
    else {
      res.json({venue: venue});

    }
  });
});

// Get Tabs for a venue
router.get('/tabs/:venueId', function(req, res) {
  var venueId = req.params.venueId;
  Tab.getTabsByVenueId(venueId, (err, tabs) => {
    if (err) throw err;
    else {
      res.json({
        success: true,
        tabs: tabs
      });
    }
  })
});

// Create Tab
router.post('/tab', function(req, res) {
  var venueId = req.body.venueId;
  var userId = req.body.userId;
  var data = {
    venueId: venueId,
    userId: userId
  };
  Tab.create(data, (tab) => {
      res.json({tab: tab})
  });
});

// Add an item/items to Tab
router.post('/addItems', function (req, res) {
  var tabId = req.body.tabId;
  var items = req.body.items;
  for(var i = 0; i < items.length; i++) {
    var data = {
      itemId: items[i],
      tabId: tabId
    };
    Tab.addItemToTab(data);
  }
  res.json({
    success: true
  })
});


// Add an item to a tab
router.post('/addToTab/:tab/:item', function (req, res) {
  var id = req.params.tab;
  var item = req.params.item;
  var tab = {
    id: id,
    item: item
  };
  Tab.addItemToTab(tab);
});

// Remove an item from tab
router.post('/removeItemFromTab/:tab/item/:item', function (req, res) {
  var id = req.params.tab;
  var item = req.params.item;
  var tab = {
    id: id,
    item: item
  };
  Tab.removeItemFromTab(tab);
});

// Close a Tab
router.post('/closeTab', function (req, res) {
  var id = req.body.tabId;
  Tab.closeTab(id, (err) => {
    if(err) throw err;
    else {
      res.json({
        success:true
      });
    }
  });
});

// Get all Tabs for venueId
router.get('/tabs/:venueId', function (req, res) {
  var venueId = req.params.venueId;

  Tab.getTabsByVenueId(venueId, (err, tabs) => {
    if (err) throw err;
    else {
      res.json({tabs: tabs});
    }
  });
});

// Get all Tabs for userId
router.get('/tabs/user/:userId', function (req, res) {
  var userId = req.params.userId;
  console.log(userId);
  Tab.getTabsByUserId(userId, (err, tabs) => {
    if (err) throw err;
    else {
      res.json({tabs: tabs});
    }
  });
});

// Get all active Tabs for userId
router.get('/tabs/active/user/:userId', function (req, res) {
  var userId = req.params.userId;
  console.log(userId);
  Tab.getActiveTabsByUserId(userId, (err, tabs) => {
    if (err) throw err;
    else {
      res.json({tabs: tabs});
    }
  });
});

// Catch all other routes and return no page found
router.get('*', function (req, res) {
  res.send("No page found");
});

module.exports = router;
