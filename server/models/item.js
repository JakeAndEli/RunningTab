const mongoose = require("mongoose");
const MenuCategory = require('./menuCategory.js');

var itemSchema = mongoose.Schema({
  name: String,
  price : Number
});

const Item = module.exports = mongoose.model('Item', itemSchema);

module.exports.create = function(data, callback){
  var newItem = new Item();
  newItem.name = data.itemName;
  newItem.price = data.itemPrice;
  newItem.save(function(err, item) {
    if (err) throw err;
    else {
      var menuCategoryData = {
        itemId: item.id,
        menuCategoryId: data.menuCategoryId
      };
      MenuCategory.addItem(menuCategoryData, (item) => {
        callback(item);
      });
    }
  });
};

module.exports.deleteItem = function(itemId, callback){
  Item.remove({_id: itemId}, function(err){
    if (err) throw err;
    else {
      callback();
    }
  });
};
