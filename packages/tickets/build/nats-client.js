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
exports.natsClient = void 0;
const node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
class NatsClient {
    get client() {
        if (!this._client)
            throw new Error('Cannot access NATS client before connecting');
        return this._client;
    }
    connect(clusterId, clientId, url) {
        return __awaiter(this, void 0, void 0, function* () {
            this._client = node_nats_streaming_1.default.connect(clusterId, clientId, { url });
            return new Promise((resolve, reject) => {
                this.client.on('connect', () => {
                    var _a;
                    if (!((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.includes('test')))
                        console.log('Connected to NATS');
                    resolve();
                });
                this.client.on('error', (err) => {
                    console.error(err);
                    reject(err);
                });
            });
        });
    }
}
exports.natsClient = new NatsClient();
exports.default = exports.natsClient;
