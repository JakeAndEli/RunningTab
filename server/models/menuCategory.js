var mongoose = require("mongoose");
const Menu = require('./menu.js');
const Venue = require('./venue.js');
const Item = require('./item.js');

var menuCategorySchema = mongoose.Schema({
  name: String,
  items: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Item'}
  ]
});

const MenuCategory = module.exports = mongoose.model("MenuCategory",menuCategorySchema);

module.exports.create = function(data, callback){
  var localData = data;
  var menuCategory = new MenuCategory();
  menuCategory.name = data.name;
  menuCategory.save(function(err, menuCategory) {
    if (err) throw err;
    var menuIdQuery = Venue.getMenuIdFromVenueId(localData.venueId);
    menuIdQuery.exec(function(err, menu) {
      if (err) throw err;
      else {
        var data = {
          menuId: menu.menuId,
          menuCategoryId: menuCategory.id
        };
        Menu.addMenuCategory(data, callback);
      }
    });
  });
};

module.exports.deleteMenuCategory = function(menuCategoryId, callback){
  MenuCategory.findById(menuCategoryId, function(err, menuCategory){
    if (err) throw err;
    var items = menuCategory.items;
    MenuCategory.remove({_id: menuCategoryId}, function(err){
      if (err) throw err;
      else {
        callback(items);
      }
    });
  });
};

module.exports.addItem = function(data, callback){
  MenuCategory.findByIdAndUpdate(data.menuCategoryId,
    {$push: {items: data.itemId}},
    {safe: true},
    function (err) {
      if (err) console.log(err);
      callback(data);
    }
  );
};

module.exports.deleteItem = function(data, callback){
  MenuCategory.findByIdAndUpdate(data.menuCategoryId,
    {$pull: {items: data.itemId}},
    {safe: true},
    function (err) {
      if (err) console.log(err);
      else {
        callback();
      }
    }
  );
};









