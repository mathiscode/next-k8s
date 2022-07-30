import type { Stan } from 'node-nats-streaming';
import Subjects from './_Subjects';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    protected client: Stan;
    constructor(client: Stan);
    publish(data: T['data']): Promise<void>;
}
export default Publisher;
