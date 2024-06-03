import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {
    data:Buffer,
    contentType:String,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema, "products");
export default Product;
