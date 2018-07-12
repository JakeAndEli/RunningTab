var mongoose = require("mongoose");

var menuSchema = mongoose.Schema({
  menuCategoryId: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'menuCategory' }
  ]

});

const Menu = module.exports = mongoose.model("Menu",menuSchema);

//Add passed menu category to the passed menu
module.exports.addMenuCategory = function (menuCategory,callback){
  Menu.findByIdAndUpdate(menuCategory.menuId,
    {$push: {menuCategoryId:menuCategory.category}},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      console.log(data);

    }
  );
};



