var mongoose = require("mongoose");

var menuCategorySchema = mongoose.Schema({
  name: String,
  items: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'item'}
  ]

});

var MenuCategory = mongoose.model("MenuCategory",menuCategorySchema);

module.exports = MenuCategory;

