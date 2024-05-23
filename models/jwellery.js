import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: String,
    image: String,
    price: Number,
    name: String,
    shipping: String,
    star: Number,
    category: String,
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'jwellery');
export default Product;
