import { Router } from 'express';
import authRoutes from './authRoutes';
import categoriesRoutes from './categoryRoutes';
import gallerRoutes from "./galleryRoutes";
import articleRoutes from "./articleRoutes";

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoriesRoutes);
router.use('/gallery', gallerRoutes);
router.use('/articles', articleRoutes);

export default router;
