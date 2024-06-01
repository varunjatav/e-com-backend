import express  from 'express';
import multer from "multer";
import { AddProduct, deleteProduct, fetchProductByPriceAndCategory, fetchProducts, fetchProductsByCategory, fetchProductsByID, fetchProductsByPrice } from '../controllers/jwellery.js';
const router = express.Router();



var storage = multer.memoryStorage();
var upload = multer({ storage: storage })
// Fetch All Products
router.get("/", fetchProducts);
// Add product
router.post("/add", upload.single('file'), AddProduct)

// Fetch products by Category
router.get("/q/cat", fetchProductsByCategory);


// Fetch products by Price
router.get("/q/price", fetchProductsByPrice);

// Fetch products by Price and Category.
router.get("/q", fetchProductByPriceAndCategory);
// Fetch a single product by ID
router.get('/:id',fetchProductsByID);

// Delete a product
router.delete('/delete/:productId', deleteProduct);
export default router;