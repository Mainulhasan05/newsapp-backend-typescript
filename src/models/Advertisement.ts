import mongoose from 'mongoose';
const { Schema } = mongoose;

const advertisementSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
    position: { type: String, enum: ['header', 'sidebar', 'footer'], required: true },
    isActive: { type: Boolean, default: false },
    sortValue: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
}, { timestamps: true });

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
export default Advertisement;
