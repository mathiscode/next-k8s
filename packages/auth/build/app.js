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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const body_parser_1 = require("body-parser");
const cookie_session_1 = __importDefault(require("cookie-session"));
const common_1 = require("@next-k8s/common");
const current_user_1 = __importDefault(require("./routes/current-user"));
const signin_1 = __importDefault(require("./routes/signin"));
const signout_1 = __importDefault(require("./routes/signout"));
const signup_1 = __importDefault(require("./routes/signup"));
if (!process.env.JWT_KEY)
    throw new Error('JWT_KEY secret not set');
const app = (0, express_1.default)();
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use((0, body_parser_1.json)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(current_user_1.default);
app.use(signin_1.default);
app.use(signout_1.default);
app.use(signup_1.default);
app.use('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new common_1.NotFoundError();
}));
app.use(common_1.errorHandler);
exports.default = app;
