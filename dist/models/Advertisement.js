"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const advertisementSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
    position: { type: String, enum: ['header', 'sidebar', 'footer'], required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
}, { timestamps: true });
const Advertisement = mongoose_1.default.model('Advertisement', advertisementSchema);
exports.default = Advertisement;
