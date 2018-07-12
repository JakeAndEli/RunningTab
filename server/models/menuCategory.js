var mongoose = require("mongoose");

var menuCategorySchema = mongoose.Schema({
  name: String,
  items: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Item'}
  ]

});

const MenuCategory = module.exports = mongoose.model("MenuCategory",menuCategorySchema);







