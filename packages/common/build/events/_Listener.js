"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(client) {
        this.ackWait = Number(process.env.LISTENER_ACK_WAIT) || 5000;
        this.client = client;
    }
    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on('message', (msg) => {
            const { subject, queueGroupName } = this;
            const data = this.parseMessage(msg);
            this.onMessage(data, msg);
        });
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    }
}
exports.Listener = Listener;
exports.default = Listener;
