import { Request, Response } from 'express';
import * as articleService from '../services/articleServices';
import { sendResponse } from '../utils/sendResponse';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

// Create a new article
export const createArticle = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, content, tags, category, featuredImage, isFeatured, status, publishedAt, metaTitle, metaDescription, metaKeywords } = req.body;
        if (!req.user?.id) {
            throw new Error('User not authenticated');
        }

        const author = req.user.id;

        const articleData = { title, content, author, tags, category, featuredImage, isFeatured, status, publishedAt, metaTitle, metaDescription, metaKeywords};
        const article = await articleService.createArticleService(articleData);

        sendResponse({ res, status: 201, success: true, message: 'Article created successfully', data: article });
    } catch (error: any) {
        sendResponse({ res, status: 400, success: false, message: error.message });
    }
};

// Get all articles with pagination and optional search
export const getArticles = async (req: Request, res: Response) => {
    try {
        const { page = 1, title = '' } = req.query;
        const articles = await articleService.getArticlesService(Number(page), title.toString());

        sendResponse({ res, status: 200, success: true, message: 'Articles retrieved successfully', data: articles });
    } catch (error: any) {
        sendResponse({ res, status: 400, success: false, message: error.message });
    }
};

// Get a single article by ID
export const getArticleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await articleService.getArticleByIdService(id);

        sendResponse({ res, status: 200, success: true, message: 'Article retrieved successfully', data: article });
    } catch (error: any) {
        sendResponse({ res, status: 400, success: false, message: error.message });
    }
};

// Update an article
export const updateArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedArticle = await articleService.updateArticleService(id, updateData);

        sendResponse({ res, status: 200, success: true, message: 'Article updated successfully', data: updatedArticle });
    } catch (error: any) {
        sendResponse({ res, status: 400, success: false, message: error.message });
    }
};

// Delete an article
export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await articleService.deleteArticleService(id);

        sendResponse({ res, status: 200, success: true, message: 'Article deleted successfully' });
    } catch (error: any) {
        sendResponse({ res, status: 400, success: false, message: error.message });
    }
};
