import dotenv from 'dotenv';
import multer, { Multer } from 'multer';
import ImageKit from 'imagekit';
import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';

// Load environment variables
dotenv.config();

const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error('ImageKit credentials are not properly configured in environment variables');
}

// Initialize ImageKit with environment variables
const imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint
});

// Multer configuration for memory storage
export const upload: Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        console.log("hello vai aisilam");
        console.log(file);
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'));
        }
    }
});

// Upload to ImageKit function
export const uploadToImageKit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: 'No file provided' });
            return;
        }

        let processedBuffer: Buffer;

        if (file.size > 1 * 1024 * 1024) { // Check if the file size is greater than 1MB
            // console.log('File size is greater than 1MB, converting to WebP...');
            processedBuffer = await sharp(file.buffer)
                .webp({ quality: 80 }) // Convert to WebP with 80% quality
                .toBuffer();
        } else {
            // console.log('File size is within the limit, uploading as is...');
            processedBuffer = await sharp(file.buffer)
                .webp({ quality: 100 }) // Convert to WebP with 100% quality for smaller images
                .toBuffer();
        }

        // Upload the processed image to ImageKit
        imagekit.upload({
            file: processedBuffer, // Use the processed buffer
            fileName: `${file.originalname.split('.')[0]}.webp`, // Change the file extension to .webp
            folder: 'songbadzog',
        }, (error, result) => {
            if (error) {
                console.error('ImageKit upload error:', error);
                next(error);
                return;
            }

            if (result) {
                req.body.imageUrl = result.url;
                req.body.publicId = result.fileId;
                req.body.source = "imagekit";
                next();
            }
        });
    } catch (error) {
        console.error('Error uploading image to ImageKit:', error);
        next(error);
    }
};
