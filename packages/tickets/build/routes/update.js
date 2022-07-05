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
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const ticket_1 = __importDefault(require("../models/ticket"));
const updated_1 = __importDefault(require("../events/publishers/tickets/updated"));
const nats_client_1 = __importDefault(require("../nats-client"));
const router = express_1.default.Router();
const validateInput = [
    (0, express_validator_1.body)('title').not().isEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('price').isInt({ gt: -1, lt: Number.MAX_SAFE_INTEGER }).withMessage('Price must be an integer of cents or units')
];
router.put('/api/tickets/:id', common_1.requireAuth, validateInput, common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(req.params.id))
        throw new common_1.BadRequestError('Invalid Ticket ID');
    const ticket = yield ticket_1.default.findById(req.params.id);
    if (!ticket)
        throw new common_1.NotFoundError();
    if (ticket.owner !== req.currentUser.id)
        throw new common_1.UnauthorizedError();
    const { title, price } = req.body;
    ticket.set({ title, price });
    yield ticket.save();
    yield new updated_1.default(nats_client_1.default.client).publish({ id: ticket.id, title: ticket.title, price: ticket.price, owner: ticket.owner });
    res.json(ticket);
}));
exports.default = router;
