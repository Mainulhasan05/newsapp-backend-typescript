import dotenv from "dotenv"
import multer, { Multer } from 'multer';
import { v2 as cloudinary, UploadApiResponse, 
UploadApiErrorResponse } from 'cloudinary';
import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET,
});


interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage: storage });

interface MulterRequest extends Request {
    file?: CloudinaryFile; 
  }

  export const uploadToCloudinary = async (req: MulterRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: 'No file provided' });
            return;
        }

        let processedBuffer: Buffer;

        if (file.size > 1 * 1024 * 1024) { // Check if the file size is greater than 1MB
            // console.log('File size is greater than 1MB, reducing quality...');
            processedBuffer = await sharp(file.buffer)
                .webp({ quality: 40 }) // Convert to WebP with reduced quality
                .toBuffer();
        } else {
            // console.log('File size is within the limit, converting to WebP...');
            processedBuffer = await sharp(file.buffer)
                .webp({ quality: 100 }) // Convert to WebP with full quality
                .toBuffer();
        }

        cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
                folder: 'songbadzog'
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    next(error);
                    return;
                }

                if (result) {
                    req.body.imageUrl = result.secure_url;
                    req.body.publicId = result.public_id;
                    req.body.source = "cloudinary";
                    next();
                } else {
                    next(new Error('Cloudinary upload result is undefined'));
                }
            }
        ).end(processedBuffer);
    } catch (error) {
        console.error('Error in uploadToCloudinary middleware:', error);
        res.status(500).json({ message: 'Error uploading image', error });
    }
};
