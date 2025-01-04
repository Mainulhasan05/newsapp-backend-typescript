import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    roles: { type: [String], enum: ['reader', 'journalist', 'editor', 'admin'], default: ['reader'] },
}, { timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
