var mongoose = require("mongoose");

var venueSchema = mongoose.Schema({
  name: String,
  menuID: {type: mongoose.Schema.Types.ObjectId, ref: 'menu' }

});

var Venue = mongoose.model("Venue", venueSchema,);

module.exports = Venue;
