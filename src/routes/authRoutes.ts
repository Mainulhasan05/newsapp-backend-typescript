import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  assignRole,
  removeRole,
  changePassword,
  refreshTokenController,
  updateProfile,
} from '../controllers/authControllers';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getProfile);
router.post('/assign-role', authenticate, authorize('admin'), assignRole);
router.post('/remove-role', authenticate, authorize('admin'), removeRole);
router.put('/change-password', authenticate, changePassword);
router.post('/refresh-token', refreshTokenController);
// routes for updating user profile
router.put('/update-profile', authenticate, updateProfile);

export default router;
