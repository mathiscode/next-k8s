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
beforeEach(() => {
    return (0, supertest_1.default)(app_1.default)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'testpass' });
});
describe('Route: /api/users/signin', () => {
    it('responds with 200 to successful signin request', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .post('/api/users/signin')
            .send({ email: 'test@test.com', password: 'testpass' })
            .expect(200);
    }));
    it('throws error on invalid email address during signin', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .post('/api/users/signin')
            .send({ email: 'test_test com', password: 'testpass' })
            .expect(400);
    }));
    it('throws error on missing email or password during signin', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/signin')
            .send({ email: 'test@test.com', password: '' })
            .expect(400);
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/signin')
            .send({ email: '', password: 'testpass' })
            .expect(400);
    }));
    it('sets a cookie after successful signin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/signin')
            .send({ email: 'test@test.com', password: 'testpass' })
            .expect(200);
        expect(response.get('Set-Cookie')).toBeDefined();
    }));
});
