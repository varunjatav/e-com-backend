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
  shipping: {
    type: String,
    required: true,
  },
  star: {
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
  mongoose.model("Product", productSchema, "jwellery");
export default Product;
