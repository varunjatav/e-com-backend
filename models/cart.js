import mongoose  from 'mongoose';

const cartSchema = new mongoose.Schema({
    id: String,
    image: String,
    price: Number,
    name: String,
    shipping: String,
    star: Number,
    category: String,
});
export default mongoose.model('Cart', cartSchema, 'cart');