import type { Message } from 'node-nats-streaming'
import { Listener, Subjects, TicketCreatedEvent } from '@next-k8s/common'

import queueGroupName from './_queue-group-name'
import Ticket from '../../models/ticket'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  queueGroupName = queueGroupName

  async onMessage (data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data
    const ticket = new Ticket({ id, title, price })
    await ticket.save()
    console.log('ticket:created', id)
    msg.ack()
  }
}

export default TicketCreatedListener
