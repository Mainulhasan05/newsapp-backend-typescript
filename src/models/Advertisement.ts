import mongoose from 'mongoose';
const { Schema } = mongoose;

const advertisementSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
    position: { type: String, enum: ['header', 'sidebar', 'footer'], required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
export default Advertisement;
