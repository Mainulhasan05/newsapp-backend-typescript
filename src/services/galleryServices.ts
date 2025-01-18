import Gallery from "../models/Gallery";
import { v2 as cloudinary, UploadApiResponse, 
    UploadApiErrorResponse } from 'cloudinary';

// createGalleryService(title, description, imageUrl, publicId, author, tags, associatedArticles, category);
export const createGalleryService = async (title: string, description: string, imageUrl: string, publicId: string, author: string, tags: string[], associatedArticles: string[], category: string,source: string) => {
    try {
        const gallery = await Gallery.create({
            title,
            description,
            imageUrl,
            publicId,
            author,
            tags,
            associatedArticles,
            category,
            source
        });
        return gallery;
    } catch (error) {
        throw error;
    }

}

export const getGalleriesService = async (page: number, search?: string) => {
    try {
      const pageSize = 1000; // Number of items per page
      const skip = (page - 1) * pageSize;
  
      // Find the total number of documents matching the query
      const totalImages = await Gallery.countDocuments({});
  
      // Fetch the galleries with pagination
      const images = await Gallery.find()
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .exec();
  
      // Calculate total pages
      const totalPages = Math.ceil(totalImages / pageSize);
  
      // Return the response with additional information
      return {
        currentPage: page,
        totalPages,
        totalImages,
        images,
      };
    } catch (error) {
      throw error;
    }
  };

export const getGalleryByIdService = async (id: string) => {
    try {
        const gallery = await Gallery.findById(id);
        return gallery;
    } catch (error) {
        throw error;
    }
};

export const deleteGalleryService = async (id: string) => {
    try {
        // find
        const gallery = await Gallery.findById(id);
        // check if source==cloudinary, then delete from cloudinary using publicId
        if (gallery?.source === 'cloudinary') {
            if(gallery?.publicId){
                await cloudinary.uploader.destroy(gallery.publicId);
            }
        }
        // delete
        await Gallery.findByIdAndDelete(id);
        return gallery;
    } catch (error) {
        throw error;
    }
};

