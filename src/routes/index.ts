import { Router } from 'express';
import authRoutes from './authRoutes';
import categoriesRoutes from './categoryRoutes';
import gallerRoutes from "./galleryRoutes";

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoriesRoutes);
router.use('/gallery', gallerRoutes);

export default router;
