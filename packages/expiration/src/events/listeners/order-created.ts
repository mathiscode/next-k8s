import type { Message } from 'node-nats-streaming'
import { Listener, OrderCreatedEvent, Subjects } from '@next-k8s/common'
import queueGroupName from './_queue-group-name'
import expirationQueue from '../../queues/expiration'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGroupName = queueGroupName

  async onMessage (data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime()
    console.log({ delay })
    await expirationQueue.add({ orderId: data.id }, { delay })
  }
}

export default OrderCreatedListener
