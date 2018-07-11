var mongoose = require("mongoose");

var menuSchema = mongoose.Schema({
  menuCategoryIds: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'menuCategory' }
  ]

});

var Menu = mongoose.model("Menu",menuSchema);

module.exports = Menu;
