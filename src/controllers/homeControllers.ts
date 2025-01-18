import { Request, Response } from 'express';
import { sendResponse } from '../utils/sendResponse';
import * as homeServices from '../services/homeServices';

export const getHomePage = async (req: Request, res: Response) => {
    try {
        const home = await homeServices.getHomeService();
        return sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Home fetched successfully',
            data: home,
        });
    } catch (error: any) {
        return sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
};

// getArticlesByCategory maintain proper pagination
export const getArticlesByCategory = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const { page = 1, title = '' } = req.query;
        const articles = await homeServices.getArticlesByCategoryService(Number(page), title.toString(), slug);
        return sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Articles fetched successfully',
            data: articles,
        });
    } catch (error: any) {
        return sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
};

// getArticleBySlug
export const getArticleBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const article = await homeServices.getArticleBySlugService(slug);
        return sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Article fetched successfully',
            data: article,
        });
    } catch (error: any) {
        return sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
};

// getCategories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const { page = 1, name = '', limit = 10 } = req.query;
        const categories = await homeServices.getCategoriesService(Number(page), name.toString(), Number(limit));
        return sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Categories fetched successfully',
            data: categories,
        });
    } catch (error: any) {
        return sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
};