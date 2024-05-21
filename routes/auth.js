import express from 'express';
import { signup, login, Users } from '../controllers/auth.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/users', Users);
export default router;
