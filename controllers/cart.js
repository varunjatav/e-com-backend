import Cart from "../models/cart.js";
import Product from '../models/jwellery.js';
import User from '../models/user.js';
// Add item to cart
export const addToCart = async (req, res) => {
    
    const userId = req.userId;
    console.log("user Id from auth request: ", userId);
   
   
     // Convert request body object to an array
     const { _id: productId } = req.body;
     console.log("body request ", {_id: productId});
    //  console.log("items :",items);
    try {
        const user = await User.findById(userId);
        console.log("user from cartj.js controller",user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

     

        let cart = await Cart.findOne({ user: userId });
        console.log("cart from cart.js controller",cart);
       
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

     
      
        // const productId = items;
        const quantity = 1;
       

        const product = await Product.findById({ _id: productId });
        // console.log("product Id: " + productId);
        console.log("product found: " + product);
       
        if(!product){
            return res.status(400).json({message: 'Product not found'});
        }

        const findIndex = cart.items.findIndex(cartItem => cartItem.product.equals(productId));
        console.log(findIndex);
        if(findIndex > -1){
            cart.items[findIndex].quantity += quantity;
        }else{
            cart.items.push({product: productId, quantity: quantity});
        }

      

       await cart.save();
       res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View cart
export const viewCart = async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.userId;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json(cart);
        }

        res.status(404).json({ message: 'Product not found in cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
