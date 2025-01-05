"use strict";
// write a function that takes all the parameters needed to set a cookie and sets it
Object.defineProperty(exports, "__esModule", { value: true });
const setCookie = (res, name, value, options) => {
    res.cookie(name, value, options);
};
exports.default = setCookie;
