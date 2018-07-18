var mongoose = require("mongoose");

var menuSchema = mongoose.Schema({
  menuCategoryId: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'menuCategory' }
  ]
});

const Menu = module.exports = mongoose.model("Menu", menuSchema);

// Add Menu Category to the passed menu
module.exports.addMenuCategory = function (data, callback){
  Menu.findByIdAndUpdate(data.menuId,
    {$push: {menuCategoryId: data.menuCategoryId}},
    {safe: true, upsert: false},
    function (err) {
      if (err) throw err;
      else {
        callback(data);
      }
    }
  );
};

//Add passed menu category to the passed menu
module.exports.removeMenuCategory = function (data, callback){
  Menu.findByIdAndUpdate(data.menuId,
    {$pull: {menuCategoryId: data.menuCategoryId}},
    {safe: true},
    function (err) {
      if (err) throw err;
      else {
        callback();
      }
    }
  );
};



