var mongoose = require("mongoose");

var tabSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  venueId: {type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
  items: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Item'}
  ],
  openedAt: {
    type: Date,
    default: Date.now
  },
  closedAt: {
    type: Date
  }
});

const Tab = module.exports = mongoose.model('Tab', tabSchema);

// Create tab
module.exports.create = function (tab, callback) {
  var newTab = new Tab();
  newTab.userId = tab.userId;
  newTab.venueId = tab.venueId;
  newTab.save(function (err, data) {
    if (err) throw err;
    callback(data);
  });
};

// Get users tabs
module.exports.getTabsByUserId = function (userId, callback) {
  Tab.find({
    userId: userId
  }).populate('venueId').populate('items').exec(callback);
};

// Get users active tabs
module.exports.getActiveTabsByUserId = function (userId, callback) {
  Tab.find({
    userId: userId,
    closedAt: null
  }).populate('venueId').populate('items').exec(callback);
};

// Get venue tabs
module.exports.getTabsByVenueId = function (venueId, callback){
  Tab.find({
    venueId : venueId
  }).populate('items').exec(callback);
};

//Add item to item array on tab
module.exports.addItemToTab = function (data, callback) {

  Tab.findByIdAndUpdate(data.tabId,
    {$push: {items: data.itemId}},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
    }
  );

  Tab.updateTabTotal(data.tabId, (err, data) => {
    if (err) throw err;
  });
};

//Remove an item to item array on tab
module.exports.removeItemFromTab = function (data, callback) {
  Tab.findByIdAndUpdate(data.tabId,
    {$pull: {items: data.itemId}},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      //console.log(data);
    }
  );

  Tab.updateTabTotal(data.tabId, (err, data) => {
    if (err) throw err;
  });
};

module.exports.updateTabTotal = function(tabId,  callback) {
  Tab.findById(tabId, function(err, tab) {
    if (err) throw err;
    else {
      console.log(tab.items);
    }
  });
};

//Set closed at date to current time
module.exports.closeTab = function (id, callback) {
  Tab.findByIdAndUpdate(id,
    {closedAt: Date.now()},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      callback();
    }
  );
};
