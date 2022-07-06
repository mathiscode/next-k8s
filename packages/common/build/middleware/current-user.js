"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = function (req, res, next) {
    var _a, _b;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt))
        return next();
    try {
        const payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = payload;
    }
    catch (err) {
        if (!((_b = process.env.NODE_ENV) === null || _b === void 0 ? void 0 : _b.includes('test')))
            console.error(err);
    }
    finally {
        return next();
    }
};
exports.currentUser = currentUser;
exports.default = exports.currentUser;
