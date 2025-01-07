import { Router } from 'express';
import authRoutes from './authRoutes';
import categoriesRoutes from './categoryRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoriesRoutes);

export default router;
