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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const common_1 = require("@next-k8s/common");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const validateInput = [
    (0, express_validator_1.body)('ticketId')
        .not()
        .isEmpty()
        .custom((input) => mongoose_1.default.Types.ObjectId.isValid(input))
        .withMessage('Ticket ID is required')
];
router.post('/api/orders', common_1.requireAuth, validateInput, common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({});
}));
exports.default = router;
