import express from 'express';
import { addToCart, viewCart, removeFromCart } from '../controllers/cart.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, addToCart);
router.get('/', auth, viewCart);
router.post('/remove', auth, removeFromCart);

export default router;
