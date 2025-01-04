import mongoose, {Schema} from 'mongoose';

const mediaSchema = new Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video', 'audio', 'document'], required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: false },
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);
export default Media;
