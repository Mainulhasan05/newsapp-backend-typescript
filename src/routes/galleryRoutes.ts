import { upload,uploadToCloudinary } from './../middlewares/cloudinaryImageUpload';
import { Router, Request, Response } from "express";

import { createGallery, getGalleries, getGalleryById,  deleteGallery } from "../controllers/galleryControllers";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

router.post("/",authenticate, authorize('admin'),upload.single('image'),uploadToCloudinary,createGallery);


// Get all galleries with pagination and search
router.get('/', getGalleries);

// Get a gallery by ID
router.get('/:id', getGalleryById);

// Delete a gallery by ID
router.delete('/:id', deleteGallery);

export default router;