import WishList from "../models/wishlist.js";
import Product from '../models/jwellery.js';
import User from '../models/user.js';
// Add item to wishlist
export const addToWishlist = async (req, res) => {
    
    const userId = req.userId;
    console.log("user Id from auth request: ", userId);
   
   console.log("request body from wishlist",req.body);
    //  // Convert request body object to an array
     const  {productId}  = req.body;
     console.log("productId from wishList: ", productId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let wishlist = await WishList.findOne({ user: userId }); 
        if (!wishlist) {
            wishlist = new WishList({ user: userId, items: [] });
        }
        const product = await Product.findById({ _id: productId });
        console.log("product found: " + product);
       
        if(!product){
            return res.status(400).json({message: 'Product not found'});
        }

        const findIndex = wishlist.items.findIndex(wishlistItem => wishlistItem.product.equals(productId));
        console.log(findIndex);
        if (findIndex === -1) {
            wishlist.items.push({ product: productId });
        }

      

       await wishlist.save();
       res.status(200).json(wishlist)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View wishlist
export const viewWishlist = async (req, res) => {
    const userId = req.userId;

    try {
        const wishlist = await WishList.findOne({ user: userId }).populate('items.product');
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    console.log("Removing item from wishlist", productId);
    const userId = req.userId;
    console.log("userId from remove wishlist", userId);
    try {
        const wishlist = await WishList.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        const itemIndex = wishlist.items.findIndex(item => item.product.equals(productId));
        if (itemIndex > -1) {
            wishlist.items.splice(itemIndex, 1);
            await wishlist.save();
            return res.status(200).json(wishlist);
        }

        res.status(404).json({ message: 'Product not found in wishlist' });
    } catch (error) {
        console.error('Error removing item from wishlist:', error);
        res.status(500).json({ message: error.message });
    }
};

