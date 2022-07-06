"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
class Publisher {
    constructor(client) {
        this.client = client;
    }
    publish(data) {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), err => {
                var _a;
                if (err)
                    return reject(err);
                if (!((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.includes('test')))
                    console.log('Event published: ', this.subject);
                resolve(data);
            });
        });
    }
}
exports.Publisher = Publisher;
exports.default = Publisher;
