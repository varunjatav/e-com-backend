import express  from 'express';

import { fetchProductByPriceAndCategory, fetchProducts, fetchProductsByCategory, fetchProductsByID, fetchProductsByPrice } from '../controllers/jwellery.js';
const router = express.Router();

// Fetch All Products
router.get("/", fetchProducts);


// Fetch products by Category
router.get("/q/cat", fetchProductsByCategory);

// Fetch products by Price
router.get("/q/price", fetchProductsByPrice);

// Fetch products by Price and Category.
router.get("/q", fetchProductByPriceAndCategory);
// Fetch a single product by ID
router.get('/:id',fetchProductsByID);

export default router;