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
const nats_client_1 = __importDefault(require("../../nats-client"));
describe('[Update Ticket] Route: /api/tickets/:id', () => {
    it('should throw a NotFoundError if the ticket does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId().toHexString();
        const cookie = yield (0, utils_1.getTokenCookie)();
        yield (0, supertest_1.default)(app_1.default)
            .put(`/api/tickets/${id}`)
            .set('Cookie', [cookie])
            .send({ title: 'Test Event', price: 23000 })
            .expect(404);
    }));
    it('should throw an UnauthorizedError if not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/tickets`)
            .set('Cookie', [cookie])
            .send({ title: 'Test Event', price: 20000 })
            .expect(201);
        yield (0, supertest_1.default)(app_1.default)
            .put(`/api/tickets/${response.body.ticket.id}`)
            .send({ title: 'Test Event', price: 23000 })
            .expect(401);
    }));
    it('should throw an UnauthorizedError if user does not own the ticket', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/tickets`)
            .set('Cookie', [cookie])
            .send({ title: 'Test Event', price: 20000 })
            .expect(201);
        const newCookie = yield (0, utils_1.getTokenCookie)();
        yield (0, supertest_1.default)(app_1.default)
            .put(`/api/tickets/${response.body.ticket.id}`)
            .set('Cookie', [newCookie])
            .send({ title: 'Test Event', price: 23000 })
            .expect(401);
    }));
    it('should throw a BadRequestError if an invalid ticket is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        yield (0, supertest_1.default)(app_1.default)
            .put(`/api/tickets/notarealid`)
            .set('Cookie', [cookie])
            .send({ title: 'Test Event', price: 20000 })
            .expect(400);
    }));
    it('should throw an error on invalid ticket data', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        const response = yield (0, utils_1.createTicket)(app_1.default, cookie);
        yield (0, supertest_1.default)(app_1.default)
            .put(`/api/tickets/${response.body.ticket.id}`)
            .set('Cookie', [cookie])
            .send({ title: '', price: 23000 })
            .expect(400);
        yield (0, supertest_1.default)(app_1.default)
            .put(`/api/tickets/${response.body.ticket.id}`)
            .set('Cookie', [cookie])
            .send({ title: 'Test Event 2', price: -33 })
            .expect(400);
    }));
    it('should update a ticket', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        const response = yield (0, utils_1.createTicket)(app_1.default, cookie);
        const updated = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/tickets/${response.body.ticket.id}`)
            .set('Cookie', [cookie])
            .send({ title: 'New Event', price: 23000 })
            .expect(200);
        const ticket = yield (0, supertest_1.default)(app_1.default).get(`/api/tickets/${response.body.ticket.id}`).send();
        expect(ticket.body.ticket.title).toEqual('New Event');
        expect(ticket.body.ticket.price).toEqual(23000);
    }));
    it('should publish a ticket:updated event', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        yield (0, utils_1.createTicket)(app_1.default, cookie);
        expect(nats_client_1.default.client.publish).toHaveBeenCalled();
    }));
});
