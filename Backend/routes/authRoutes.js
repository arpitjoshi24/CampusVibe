import express from 'express';
import { loginUser, changePassword } from '../controllers/authController.js';
import { protect, checkPasswordChange } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Public route for logging in
// No 'checkPasswordChange' here, as they need to log in first
router.post('/login', loginUser);

// ✅ Protected route for changing your password
// 1. 'protect' confirms you are logged in.
// 2. 'checkPasswordChange' is the special middleware that ALLOWS this route
//    even if your 'mustChangePassword' flag is true.
router.put('/change-password', protect, checkPasswordChange, changePassword);

export default router;