import express from 'express';
import { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/articleControllers';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

// Create a new article
router.post('/', authenticate, authorize('admin','journalist'), createArticle);

// Get all articles with pagination and search
router.get('/', getArticles);

// Get an article by ID
router.get('/:id', getArticleById);

// Update an article by ID
router.put('/:id', authenticate, authorize('admin','journalist'), updateArticle);

// Delete an article by ID
router.delete('/:id', authenticate, authorize('admin'), deleteArticle);

export default router;
