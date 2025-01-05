"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendResponse_1 = require("../utils/sendResponse");
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return (0, sendResponse_1.sendResponse)({
            res,
            status: 401,
            success: false,
            message: 'Authentication token missing',
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user details to the request object
        next();
    }
    catch (error) {
        return (0, sendResponse_1.sendResponse)({
            res,
            status: 401,
            success: false,
            message: 'Invalid or expired token',
        });
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        var _a;
        const userRoles = (_a = req.user) === null || _a === void 0 ? void 0 : _a.roles;
        if (!userRoles || !roles.some(role => userRoles.includes(role))) {
            return (0, sendResponse_1.sendResponse)({
                res,
                status: 403,
                success: false,
                message: 'Access denied: Insufficient permissions',
            });
        }
        next();
    };
};
exports.authorize = authorize;
