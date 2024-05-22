import express from 'express';
import { signup, login, Users, Logout, sendPasswordReset } from '../controllers/auth.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/users', Users);
router.post('/logout', Logout);
router.post('/send-password-reset', sendPasswordReset);
// router.get('/send-password-reset', sendPasswordReset)
export default router;
