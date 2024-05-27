import mongoose from 'mongoose';

const wishListSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    }],
});

const WishList = mongoose.models.WishList || mongoose.model('WishList', wishListSchema, 'wishList');
export default WishList;
