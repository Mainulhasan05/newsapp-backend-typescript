import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryControllers';

const router = express.Router();

// Create a new category
router.post('/', createCategory);

// Get all categories with pagination and search
router.get('/', getCategories);

// Get a category by ID
router.get('/:id', getCategoryById);

// Update a category by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

export default router;
