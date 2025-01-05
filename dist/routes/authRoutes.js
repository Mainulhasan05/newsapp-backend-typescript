"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/register', authControllers_1.registerUser);
router.post('/login', authControllers_1.loginUser);
router.get('/profile', authMiddleware_1.authenticate, authControllers_1.getProfile);
router.post('/assign-role', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('admin'), authControllers_1.assignRole);
router.post('/remove-role', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('admin'), authControllers_1.removeRole);
router.post('/change-password', authMiddleware_1.authenticate, authControllers_1.changePassword);
exports.default = router;
