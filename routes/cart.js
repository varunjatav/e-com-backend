    import express from 'express';

    import auth from '../middleware/auth.js';
    import {addToCart, decrementCart, removeFromCart, viewCart} from '../controllers/cart.js';
    // console.log(addToCart);
    const router = express.Router();

    router.post('/add', auth, addToCart);
    // router.get('/add', auth, addToCart);
    router.get('/', auth, viewCart);
    router.delete('/delete/:productId', auth, removeFromCart);
    router.delete('/decrement/:productId', auth, decrementCart);

    export default router;
