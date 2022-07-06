"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const unauthorized_error_1 = require("../errors/unauthorized-error");
const requireAuth = function (req, res, next) {
    if (!req.currentUser)
        throw new unauthorized_error_1.UnauthorizedError('User is not authenticated');
    return next();
};
exports.requireAuth = requireAuth;
exports.default = exports.requireAuth;
