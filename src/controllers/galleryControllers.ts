import { Request, Response } from 'express';
import * as galleryService from '../services/galleryServices';
import { sendResponse } from '../utils/sendResponse';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import { AnyArray } from 'mongoose';

// const gallerySchema = new Schema({
//     title: { type: String, required: true },
//     description: { type: String }, 
//     imageUrl: { type: String, required: true }, 
//     publicId: { type: String, required: false },
//     author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     tags: { type: [String], default: [] },
//     associatedArticles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
//     category: { type: Schema.Types.ObjectId, ref: 'Category' },
// }, { timestamps: true });

export const createGallery = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if(!req.user?.id) throw new Error('User not authenticated');
        const { title, description, imageUrl, publicId,  tags, associatedArticles, category,source } = req.body;

        const author = req.user.id;
        const newGallery = await galleryService.createGalleryService(title, description, imageUrl, publicId, author, tags, associatedArticles, category,source);

        if (newGallery) {
            return sendResponse({
                res,
                status: 200,
                success: true,
                message: 'Gallery created successfully',
                data: newGallery,
            });
        }
        console.log(newGallery);

        return sendResponse({
            res,
            status: 400,
            success: false,
            message: 'Failed to create gallery',
            data: null,
        });
    } catch (error:any) {
        return sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
            data: null,
        })        
    }
};

export const getGalleries = async (req: Request, res: Response) => {
    try {
        const { page = 1,  search = "" } = req.query;
        const galleries = await galleryService.getGalleriesService(page as number,  search as string);
        return sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Galleries fetched successfully',
            data: galleries,
        });
    } catch (error:any) {
        return sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
            data: null,
        });
    }
};

export const getGalleryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const gallery = await galleryService.getGalleryByIdService(id);
        return sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Gallery fetched successfully',
            data: gallery,
        });
    } catch (error:any) {
        return sendResponse({
            res,
            status: 400,
            success: false,
            message:error.message,
            data: null,
        });
    }
};

export const deleteGallery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedGallery = await galleryService.deleteGalleryService(id);
        return sendResponse({
            res,
            status: 200,
            success: true,
            message: 'Gallery deleted successfully',
            data: deletedGallery,
        });
    } catch (error:any) {
        return sendResponse({
            res,
            status: 400,
            success: false,
            message: error.message,
            data: null,
        });
    }
};