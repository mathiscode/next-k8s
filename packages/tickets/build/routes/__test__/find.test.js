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
const utils_1 = require("../../test/utils");
describe('[List Tickets] Route: /api/tickets', () => {
    it('should return a list of tickets', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        yield (0, utils_1.createTicket)(app_1.default, cookie);
        yield (0, utils_1.createTicket)(app_1.default, cookie, 'Test Event 2', 40000);
        const list = yield (0, supertest_1.default)(app_1.default)
            .get('/api/tickets')
            .send()
            .expect(200);
        expect(list.body.tickets).toBeDefined();
        expect(list.body.tickets.length).toEqual(2);
    }));
});
