"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TicketModel = void 0;
var mongoose_1 = require("mongoose");
var ticketSchema = new mongoose_1["default"].Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        versionKey: false,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        }
    }
});
exports.TicketModel = mongoose_1["default"].model('Ticket', ticketSchema);
var Ticket = /** @class */ (function (_super) {
    __extends(Ticket, _super);
    function Ticket(attributes) {
        return _super.call(this, attributes) || this;
    }
    return Ticket;
}(exports.TicketModel));
exports["default"] = Ticket;
