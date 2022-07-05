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
const common_1 = require("@next-k8s/common");
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const ticket_1 = __importDefault(require("../models/ticket"));
const router = express_1.default.Router();
router.get('/api/tickets/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(req.params.id))
        throw new common_1.BadRequestError('Invalid Ticket ID');
    const ticket = yield ticket_1.default.findById(req.params.id);
    if (!ticket)
        throw new common_1.NotFoundError();
    res.json({ ticket });
}));
exports.default = router;
