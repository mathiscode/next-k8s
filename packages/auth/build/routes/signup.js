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
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("@next-k8s/common");
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
const validateInput = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email is not valid'),
    (0, express_validator_1.body)('password').trim().isLength({ min: 4, max: 32 }).withMessage('Password must be between 4 and 32 characters')
];
router.post('/api/users/signup', validateInput, common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const exists = yield user_1.default.exists({ email: email.toLowerCase() });
    if (exists)
        throw new common_1.BadRequestError('User already exists');
    try {
        const user = new user_1.default({ email: email.toLowerCase(), password });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY);
        req.session = { jwt: token };
        res.status(201).json({ user, jwt: token });
    }
    catch (err) {
        console.error(err);
        throw new common_1.DatabaseConnectionError('Failed to insert user');
    }
}));
exports.default = router;
