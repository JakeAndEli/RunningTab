var mongoose = require("mongoose");

var itemSchema = mongoose.Schema({
  name: String,
  price : {type: Number, get: getPrice, set: setPrice }
});

function getPrice(num){
  return (num/100).toFixed(2);
}

function setPrice(num){
  return num*100;
}

var Item = mongoose.model("Item",itemSchema);

module.exports = Item;
