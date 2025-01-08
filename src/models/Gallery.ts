import mongoose, { Schema } from 'mongoose';

const gallerySchema = new Schema({
    title: { type: String, required: false },
    description: { type: String }, 
    imageUrl: { type: String, required: true }, 
    publicId: { type: String, required: false },
    source: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], default: [] },
    associatedArticles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
