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
describe('Route: /api/users/current', () => {
    it('responds with the current user', () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield (0, utils_1.getTokenCookie)();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/users/current')
            .set('Cookie', cookie)
            .send()
            .expect(200);
        expect(response.body.user.email).toEqual('test@test.com');
    }));
    it('responds with null if not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/users/current')
            .send()
            .expect(401);
        expect(response.body.user).toEqual(null);
    }));
});
