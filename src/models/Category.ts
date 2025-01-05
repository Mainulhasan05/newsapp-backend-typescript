import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
        default: null
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    sortValue: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;