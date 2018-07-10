var mongoose = require("mongoose");

var menuSchema = mongoose.Schema({
  MenuCategoryId: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'menuCateogry' }
    ]

});

var Menu = mongoose.model("Menu",menuSchema);

module.exports = Menu;
