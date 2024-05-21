import mongoose  from 'mongoose';

const productSchema = new mongoose.Schema({
    id: String,
    image: String,
    price: Number,
    name: String,
    shipping: String,
    star: Number,
    category: String,
});
export default mongoose.model('Product', productSchema, 'jwellery');