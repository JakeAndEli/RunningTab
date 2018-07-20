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
  },
  total: Number,
  tip: Number
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

// Get venue past tabs
module.exports.getPassedTabsByVenueId = function (venueId, callback){
  Tab.find({
    venueId : venueId,
    closedAt: { $ne: null }
  }).populate('userId').populate('items').exec(callback);
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

//Add total and tip to bill once closed
module.exports.addTotal = function (data, callback) {
  Tab.findByIdAndUpdate(data.tabId,
    {total: data.total},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      callback();
    }
  );
};

//Add total and tip to bill once closed
module.exports.addTipAndTotal = function (data, callback) {
  Tab.findByIdAndUpdate(data.tabId,
    {total: data.total},
    {tip: data.tip},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      callback();
    }
  );
};
