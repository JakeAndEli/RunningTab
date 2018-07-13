var mongoose = require("mongoose");

var itemSchema = mongoose.Schema({
  name: String,
  price : Number
});

const Item = module.exports = mongoose.model('Item', itemSchema);

module.exports.create = function(item, callback){
  var newItem = new Item();
  newItem.name = item.name;
  newItem.price = item.price;
  newItem.save(function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Created Item.")
    }
  });
};
