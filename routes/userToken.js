import express from "express";
import { deleteUserToken, getUserToken } from "../controllers/userToken.js";



const router = express.Router();


router.get('/', getUserToken);
router.delete('/delete', deleteUserToken)

export default router;