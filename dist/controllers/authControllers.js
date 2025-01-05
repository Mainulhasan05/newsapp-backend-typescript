"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.removeRole = exports.assignRole = exports.getProfile = exports.loginUser = exports.registerUser = void 0;
const authService = __importStar(require("../services/authServices"));
const sendResponse_1 = require("../utils/sendResponse");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const setCookie_1 = __importDefault(require("../utils/setCookie"));
// Register User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, roles } = req.body;
        const user = yield authService.registerUser({ name, email, password, roles });
        // Generate token
        const token = (0, generateToken_1.default)({ id: user._id, roles: user.roles }, '1d');
        // Set token in a secure cookie
        (0, setCookie_1.default)(res, 'news_auth_token', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 24 * 3600000) });
        (0, sendResponse_1.sendResponse)({
            res,
            status: 201,
            success: true,
            message: 'User registered successfully',
            data: user,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield authService.loginUser(email, password);
        (0, sendResponse_1.sendResponse)({
            res,
            status: 200,
            success: true,
            message: 'Login successful',
            data: { token },
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
});
exports.loginUser = loginUser;
// Get Profile
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return (0, sendResponse_1.sendResponse)({
                res,
                status: 400,
                success: false,
                message: 'User is not authenticated',
            });
        }
        const userId = req === null || req === void 0 ? void 0 : req.user.id;
        const profile = yield authService.getProfile(userId);
        (0, sendResponse_1.sendResponse)({
            res,
            status: 200,
            success: true,
            message: 'Profile retrieved successfully',
            data: profile,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
});
exports.getProfile = getProfile;
// Assign Role
const assignRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.body;
        const updatedUser = yield authService.assignRole(userId, role);
        (0, sendResponse_1.sendResponse)({
            res,
            status: 200,
            success: true,
            message: 'Role assigned successfully',
            data: updatedUser,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
});
exports.assignRole = assignRole;
// Remove Role
const removeRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.body;
        const updatedUser = yield authService.removeRole(userId, role);
        (0, sendResponse_1.sendResponse)({
            res,
            status: 200,
            success: true,
            message: 'Role removed successfully',
            data: updatedUser,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
});
exports.removeRole = removeRole;
// Change Password
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return (0, sendResponse_1.sendResponse)({
                res,
                status: 400,
                success: false,
                message: 'User is not authenticated',
            });
        }
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;
        yield authService.changePassword(userId, oldPassword, newPassword);
        (0, sendResponse_1.sendResponse)({
            res,
            status: 200,
            success: true,
            message: 'Password changed successfully',
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            status: 400,
            success: false,
            message: error.message,
        });
    }
});
exports.changePassword = changePassword;
