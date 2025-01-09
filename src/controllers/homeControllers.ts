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