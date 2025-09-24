import express from 'express';
import { handleLogin, handleLogout, handleSignup, getProfile, handleDeleteUser } from "../controllers/userController.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.delete('/delete', authMiddleware, handleDeleteUser);
// Protected
router.get("/profile", authMiddleware, getProfile);

export default router;