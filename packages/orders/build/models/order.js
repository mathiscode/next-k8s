"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    expiresAt: {
        type: mongoose_1.default.Schema.Types.Date
    },
    ticket: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, {
    toJSON: {
        versionKey: false,
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
exports.OrderModel = mongoose_1.default.model('Order', orderSchema);
class Order extends exports.OrderModel {
    constructor(attributes) {
        super(attributes);
    }
}
exports.default = Order;
