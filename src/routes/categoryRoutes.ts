import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryControllers';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

// Create a new category
router.post('/', authenticate,authorize('admin'), createCategory);

// Get all categories with pagination and search
router.get('/', getCategories);

// Get a category by ID
router.get('/:id', getCategoryById);

// Update a category by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

export default router;
