var mongoose = require("mongoose");

var venueSchema = mongoose.Schema({
  venueName: String,
  venueTownCity: String,
  venueState: String,
  menuId: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }
});

var Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
