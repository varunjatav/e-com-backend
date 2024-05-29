import express from 'express';
import { signup, login, Users, Logout, sendPasswordReset, refreshToken, SingleUser } from '../controllers/auth.js';
import { loginValidation, sendPasswordResetValidation, signUpValidation } from '../middleware/validation.js';

const router = express.Router();

router.post('/signup',signUpValidation, signup);

router.post('/login', loginValidation, login);
router.get('/users', Users);
router.get("/singleuser/:userId", SingleUser)
router.post('/logout', Logout);
router.post('/send-password-reset', sendPasswordResetValidation, sendPasswordReset);
router.post('/refresh-token', refreshToken);


export default router;
