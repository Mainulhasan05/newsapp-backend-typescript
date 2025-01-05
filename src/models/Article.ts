import mongoose, {Schema} from 'mongoose';
const articleSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], default: [] },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    featuredImage: { type: String },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    publishedAt: { type: Date },
    
}, { timestamps: true});

const Article = mongoose.model('Article', articleSchema);
export default Article;
