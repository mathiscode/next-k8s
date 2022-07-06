"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = function (err, req, res, next) {
    var _a, _b;
    if (!((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.includes('test')))
        console.error(err);
    return res.status(err.status || 500).json({ error: ((_b = err.serialize) === null || _b === void 0 ? void 0 : _b.call(err)) || err.message });
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
