import express  from "express";
import { addToWishlist, removeFromWishlist, viewWishlist } from "../controllers/wishlist.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/add',auth,addToWishlist);

router.get('/', auth, viewWishlist);

router.delete('/delete/:productId', auth, removeFromWishlist);


export default router;