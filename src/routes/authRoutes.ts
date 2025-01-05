import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  assignRole,
  removeRole,
  changePassword,
  refreshTokenController,
} from '../controllers/authControllers';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getProfile);
router.post('/assign-role', authenticate, authorize('admin'), assignRole);
router.post('/remove-role', authenticate, authorize('admin'), removeRole);
router.post('/change-password', authenticate, changePassword);
router.post('/refresh-token', refreshTokenController);

export default router;
