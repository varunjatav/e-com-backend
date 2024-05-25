    import express from 'express';

    import auth from '../middleware/auth.js';
    import {addToCart, removeFromCart, viewCart} from '../controllers/cart.js';
    // console.log(addToCart);
    const router = express.Router();

    router.post('/add', auth, addToCart);
    // router.get('/add', auth, addToCart);
    router.get('/', auth, viewCart);
    router.delete('/delete/:productId', auth, removeFromCart);

    export default router;
