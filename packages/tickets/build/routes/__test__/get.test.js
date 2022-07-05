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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../../app"));
const utils_1 = require("../../test/utils");
describe('[Get Ticket] Route: /api/tickets/:id', () => {
    it('should throw a BadRequestError if ticket ID is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .get('/api/tickets/notarealid')
            .send()
            .expect(400);
    }));
    it('should throw a NotFoundError if ticket not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId().toHexString();
        yield (0, supertest_1.default)(app_1.default)
            .get(`/api/tickets/${id}`)
            .send()
            .expect(404);
    }));
    it('should return the fetched ticket', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        const response = yield (0, utils_1.createTicket)(app_1.default, cookie);
        const ticket = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/tickets/${response.body.ticket.id}`)
            .send()
            .expect(200);
        expect(ticket.body.ticket.title).toEqual('Test Event');
        expect(ticket.body.ticket.price).toEqual(20000);
    }));
});
