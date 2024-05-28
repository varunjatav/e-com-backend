import express from 'express';
import { signup, login, Users, Logout, sendPasswordReset } from '../controllers/auth.js';
import { loginValidation, sendPasswordResetValidation, signUpValidation } from '../middleware/validation.js';
// import auth from '../middleware/auth.js';


const router = express.Router();

router.post('/signup',signUpValidation, signup);
router.post('/login', loginValidation, login);
router.get('/users', Users);
router.post('/logout', Logout);
router.post('/send-password-reset', sendPasswordResetValidation, sendPasswordReset);

export default router;
