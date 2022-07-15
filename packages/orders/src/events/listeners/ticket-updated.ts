import type { Message } from 'node-nats-streaming'
import { Listener, NotFoundError, Subjects, TicketUpdatedEvent } from '@next-k8s/common'

import queueGroupName from './_queue-group-name'
import Ticket, { ITicket } from '../../models/ticket'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  queueGroupName = queueGroupName

  async onMessage (data: TicketUpdatedEvent['data'], msg: Message) {
    const { id, title, price } = data
    const ticket = await (Ticket as ITicket).findByEvent(data)
    if (!ticket) throw new NotFoundError('Ticket not found')
    ticket.set({ title, price })
    await ticket.save()
    console.log('ticket:updated', id)
    msg.ack()
  }
}

export default TicketUpdatedListener
