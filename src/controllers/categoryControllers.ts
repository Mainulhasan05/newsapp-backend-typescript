// categoryControllers.ts
import { Request, Response } from 'express';
import * as categoryService from '../services/categoryServices';
import { sendResponse } from '../utils/sendResponse';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';


// Create a new category
export const createCategory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if(req.user?.id){
            req.body.createdBy = req.user.id;
        }
        else{
            throw new Error('User not authenticated');
        }

        const {
            name,
            description,
            parentCategory,
            isFeatured,
            status,
            sortValue,
            createdBy,
            metaTitle,
            metaDescription,
            metaKeywords
        } = req.body;


        const categoryData = {
            name,
            description,
            parentCategory,
            isFeatured,
            status,
            sortValue,
            createdBy,
            metaTitle,
            metaDescription,
            metaKeywords
        };

        const category = await categoryService.createCategoryService(categoryData);

        sendResponse({
            res,
            status: 201,
            success: true,
            message: 'Category created successfully',
            data: category,
        });
    } catch (error: any) {
        sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
};

// Get all categories with pagination and optional search
export const getCategories = async (req: Request, res: Response) => {
    try {
        const { page = 1, name = '' } = req.query;
        const categories = await categoryService.getCategoriesService(Number(page), name.toString());

        sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Categories retrieved successfully',
            data: categories,
        });
    } catch (error: any) {
        sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
};

// Get a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryByIdService(id);

        sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Category retrieved successfully',
            data: category,
        });
    } catch (error: any) {
        sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        

        const updatedCategory = await categoryService.updateCategoryService(id, updateData);

        sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory,
        });
    } catch (error: any) {
        sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategoryService(id);

        sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Category deleted successfully',
        });
    } catch (error: any) {
        sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
};

