import express  from 'express';

import { fetchProducts, fetchProductsByID } from '../controllers/jwellery.js';
const router = express.Router();

// Fetch All Products
router.get("/", fetchProducts)

// Fetch a single product by ID
router.get('/:id',fetchProductsByID);

export default router;