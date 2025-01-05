"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = ({ res, status, success, message, data }) => {
    res.status(status).json({
        success,
        message,
        data: data || null,
    });
};
exports.sendResponse = sendResponse;
