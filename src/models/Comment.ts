import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' }, // For nested replies
}, { timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
