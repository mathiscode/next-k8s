import { Listener, NotFoundError, OrderCancelledEvent, Subjects } from '@next-k8s/common'
import { Message } from 'node-nats-streaming'
import Ticket from '../../models/ticket'
import TicketUpdatedPublisher from '../publishers/updated'

import queueGroupName from './_queue-group-name'

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
  queueGroupName = queueGroupName

  async onMessage (data: OrderCancelledEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id)
    if (!ticket) throw new NotFoundError('Ticket not found')
    ticket.set({ orderId: undefined })
    await ticket.save()

    const { id, version, price, title, owner, orderId } = ticket
    await new TicketUpdatedPublisher(this.client).publish({ id, version, price, title, owner, orderId })
    msg.ack()
  }
}

export default OrderCancelledListener
