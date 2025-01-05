"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    roles: { type: [String], enum: ['reader', 'journalist', 'editor', 'admin'], default: ['reader'] },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
