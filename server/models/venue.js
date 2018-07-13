var mongoose = require("mongoose");

var venueSchema = mongoose.Schema({
  venueName: String,
  venueTownCity: String,
  venueState: String,
  menuId: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}
});

const Venue = module.exports = mongoose.model("Venue", venueSchema);

//Get full menu for venue
module.exports.getFullMenuByVenueId = function (venueId, callback) {

  Venue.find({
    _id: venueId
  }).populate({
    path: 'menuId',
    model: 'Menu',
    populate: {
      path: 'menuCategoryId',
      model: 'MenuCategory',
      populate: {
        path: 'items',
        model: 'Item'
      }
    }
  }).exec(callback);
};

module.exports.getMenuIdFromVenueId = function (venueId, callback) {
  return Venue.findById(venueId);
};
