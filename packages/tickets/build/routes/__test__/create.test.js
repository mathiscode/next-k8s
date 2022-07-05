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
const app_1 = __importDefault(require("../../app"));
const ticket_1 = __importDefault(require("../../models/ticket"));
const nats_client_1 = __importDefault(require("../../nats-client"));
const utils_1 = require("../../test/utils");
// const createTicket = (cookie?: string, title = 'Test Event', price = 20000, expectedStatusCode = 201) => {
//   return request(app)
//     .post('/api/tickets')
//     .set('Cookie', cookie ? [cookie] : [])
//     .send({ title, price })
//     .expect(expectedStatusCode)
// }
describe('[Create New Ticket] Route: /api/tickets', () => {
    it('should be a valid route', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/tickets').send({});
        expect(response.status).not.toEqual(404);
    }));
    it('should throw UnauthorizedError if unauthenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/tickets').send({});
        expect(response.status).toEqual(401);
    }));
    it('should not get UnauthorizedError if authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/tickets')
            .set('Cookie', [cookie])
            .send({});
        expect(response.status).not.toEqual(401);
    }));
    it('should throw error if new ticket has invalid title', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/tickets')
            .set('Cookie', [cookie])
            .send({ title: '', price: 10 })
            .expect(400);
    }));
    it('should throw error if new ticket has invalid price', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/tickets')
            .set('Cookie', [cookie])
            .send({ title: 'Test Event', price: -10 })
            .expect(400);
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/tickets')
            .set('Cookie', [cookie])
            .send({ title: 'Test Event' })
            .expect(400);
    }));
    it('should create a new ticket', () => __awaiter(void 0, void 0, void 0, function* () {
        let tickets = yield ticket_1.default.find({});
        const cookie = yield (0, utils_1.getTokenCookie)();
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/tickets')
            .set('Cookie', [cookie])
            .send({
            title: 'Test Event',
            price: 20000
        });
        tickets = yield ticket_1.default.find({});
        expect(tickets.length).toEqual(1);
        expect(tickets[0].title).toEqual('Test Event');
        expect(tickets[0].price).toEqual(20000);
    }));
    it('should publish a ticket:created event', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        yield (0, utils_1.createTicket)(app_1.default, cookie);
        expect(nats_client_1.default.client.publish).toHaveBeenCalled();
    }));
});
