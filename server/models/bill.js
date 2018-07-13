var mongoose = require("mongoose");

var billSchema = mongoose.Schema({
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

const Bill = module.exports = mongoose.model('Bill', billSchema);

// Create bill
module.exports.create = function (bill, callback) {
  var newBill = new Bill();
  newBill.userId = bill.userId;
  newBill.venueId = bill.venueId;
  newBill.save(function (err, data) {
    if (err) console.log(err);
  });
};

// Get users bills
module.exports.getBillsByUserId = function (userId, callback) {
  Bill.find({
    userId: userId
  }).populate('venueId').exec(callback);
};

//Get venue bills
module.exports.getBillsByVenueId = function (venueId, callback){
  Bill.find({
    venueId : venueId
  }).populate().exec(callback);
};

//Add item to item array on bill
module.exports.addItemToBill = function (bill, callback) {

  Bill.findByIdAndUpdate(bill.id,
    {$push: {items: bill.item}},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      //console.log(data);
    }
  );
};

//Remove an item to item array on bill
module.exports.removeItemFromBill = function (bill, callback) {
  Bill.findByIdAndUpdate(bill.id,
    {$pull: {items: bill.item}},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      //console.log(data);
    }
  );
};

//Set closed at date to current time
module.exports.closeBill = function (id, callback) {
  Bill.findByIdAndUpdate(id,
    {closedAt: Date.now()},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      console.log(data);
    }
  );
};
