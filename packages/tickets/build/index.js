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
const mongoose_1 = __importDefault(require("mongoose"));
const nats_client_1 = __importDefault(require("./nats-client"));
const app_1 = __importDefault(require("./app"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_KEY)
        throw new Error('JWT_KEY is undefined');
    if (!process.env.MONGO_URI)
        throw new Error('MONGO_URI is undefined');
    if (!process.env.NATS_URL)
        throw new Error('NATS_URL is undefined');
    if (!process.env.NATS_CLUSTER_ID)
        throw new Error('NATS_CLUSTER_ID is undefined');
    if (!process.env.NATS_CLIENT_ID)
        throw new Error('NATS_CLIENT_ID is undefined');
    yield nats_client_1.default.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
    nats_client_1.default.client.on('close', () => {
        var _a;
        if (!((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.includes('test')))
            console.log('NATS connection closed');
        process.exit();
    });
    process.on('SIGINT', () => nats_client_1.default.client.close());
    process.on('SIGTERM', () => nats_client_1.default.client.close());
    yield mongoose_1.default.connect(process.env.MONGO_URI);
    console.log('Database connected!');
    const port = process.env.PORT || 3000;
    app_1.default.listen(port, () => {
        console.log('Service running on port:', port);
    });
});
start();
