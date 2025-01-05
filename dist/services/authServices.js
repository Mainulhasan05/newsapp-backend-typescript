"use strict";
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// Register User
const registerUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password }) {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = new User_1.default({ name, email, password: hashedPassword });
    return yield user.save();
});
exports.registerUser = registerUser;
// Login User
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email }).select('+password');
    if (!user)
        throw new Error('Invalid email or password');
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid)
        throw new Error('Invalid email or password');
    const token = jsonwebtoken_1.default.sign({ id: user._id, roles: user.roles }, JWT_SECRET, { expiresIn: '1d' });
    return token;
});
exports.loginUser = loginUser;
// Get Profile
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findById(userId).select('-password');
});
exports.getProfile = getProfile;
// Assign Role
const assignRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user)
        throw new Error('User not found');
    if (!user.roles.includes(role)) {
        user.roles.push(role);
    }
    return yield user.save();
});
exports.assignRole = assignRole;
// Remove Role
const removeRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user)
        throw new Error('User not found');
    user.roles = user.roles.filter(r => r !== role);
    return yield user.save();
});
exports.removeRole = removeRole;
// Change Password
const changePassword = (userId, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId).select('+password');
    if (!user)
        throw new Error('User not found');
    const isPasswordValid = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isPasswordValid)
        throw new Error('Incorrect old password');
    user.password = yield bcrypt_1.default.hash(newPassword, 10);
    yield user.save();
});
exports.changePassword = changePassword;
