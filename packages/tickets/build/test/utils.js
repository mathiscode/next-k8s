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
exports.createTicket = exports.getTokenCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const getTokenCookie = () => __awaiter(void 0, void 0, void 0, function* () {
    const payload = { id: new mongoose_1.default.Types.ObjectId().toHexString(), email: 'test@test.com' };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
    const cookie = Buffer.from(JSON.stringify({ jwt: token })).toString('base64');
    return `session=${cookie}`;
});
exports.getTokenCookie = getTokenCookie;
const createTicket = (app, cookie, title = 'Test Event', price = 20000, expectedStatusCode = 201) => {
    return (0, supertest_1.default)(app)
        .post('/api/tickets')
        .set('Cookie', cookie ? [cookie] : [])
        .send({ title, price })
        .expect(expectedStatusCode);
};
exports.createTicket = createTicket;
