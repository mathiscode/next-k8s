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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const common_1 = require("@next-k8s/common");
const user_1 = __importDefault(require("../models/user"));
const validateInput = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be a valid email address'),
    (0, express_validator_1.body)('password').trim().notEmpty().withMessage('A password must be provided')
];
const router = express_1.default.Router();
router.post('/api/users/signin', validateInput, common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: req.body.email }).exec();
    if (!user)
        throw new common_1.UnauthorizedError('Incorrect username or password', 401, req.body.email);
    const validPassword = yield user.verifyPassword(req.body.password);
    if (!validPassword)
        throw new common_1.UnauthorizedError('Incorrect username or password', 401, req.body.email);
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY);
    req.session = { jwt: token };
    res.json({ user, jwt: token });
}));
exports.default = router;
