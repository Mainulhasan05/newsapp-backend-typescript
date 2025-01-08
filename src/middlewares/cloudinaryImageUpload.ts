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
  
      const resizedBuffer: Buffer = await sharp(file.buffer)
        .resize({ width: 1000, height: 1000 })
        .toBuffer();
  
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'songbadzog',
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
      ).end(resizedBuffer);
    } catch (error) {
      console.error('Error in uploadToCloudinary middleware:', error);
      res.status(500).json({ message: 'Error uploading image', error });
    }
  };