"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsClient = void 0;
exports.natsClient = {
    client: {
        publish: jest.fn()
            .mockImplementation((subject, data, callback) => {
            callback();
        })
    }
};
exports.default = exports.natsClient;
