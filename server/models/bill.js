var mongoose = require("mongoose");

var billSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  venueId: {type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  items: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Item'}
  ]

});

var bill = mongoose.model("bill",billSchema);

module.exports = bill;

