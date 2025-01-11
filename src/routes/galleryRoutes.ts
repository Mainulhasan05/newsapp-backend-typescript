import { upload,uploadToCloudinary } from './../middlewares/cloudinaryImageUpload';
import { uploadToImageKit, upload as imageUpload } from '../middlewares/imageKitImageUpload';
import { Router, Request, Response } from "express";

import { createGallery, getGalleries, getGalleryById,  deleteGallery } from "../controllers/galleryControllers";

import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

router.post("/",authenticate, authorize('admin', 'journalist', 'editor'),upload.single('image'),uploadToCloudinary,createGallery);

// Create a new gallery
router.post('/imagekit', authenticate, authorize('admin'), imageUpload.single('image'), uploadToImageKit, (req: Request, res: Response): void => {
    
    res.status(200).json({ message: 'Image uploaded successfully', success: true, data: req.body.imageUrl });
});

// Get all galleries with pagination and search
router.get('/', getGalleries);

// Get a gallery by ID
router.get('/:id', getGalleryById);

// Delete a gallery by ID
router.delete('/:id',authenticate, authorize('admin'), deleteGallery);

export default router;