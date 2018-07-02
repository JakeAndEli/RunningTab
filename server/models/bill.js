var mongoose = require("mongoose");

var billSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  venueId: {type: mongoose.Schema.Types.ObjectId, ref: 'venue' },
  items: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'item'}
  ]

});

var bill = mongoose.model("bill",billSchema);

module.exports = bill;

