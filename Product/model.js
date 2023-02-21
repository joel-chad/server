const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Include the product name"],
  },
  price: {
    type: String,
    required: [true, "Please Include the product price"],
  },
  description: {
    type: String,
    required: [true, "Please Include the product price"],
  },
 image: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;