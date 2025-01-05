"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, expiresIn) => {
    console.log("jwt secret", process.env.JWT_SECRET);
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET
        || 'your_jwt_secret', { expiresIn });
};
exports.default = generateToken;
