import type { Message } from 'node-nats-streaming'
import type { TicketCreatedEvent } from './ticket-created-event'

import Listener from './base-listener'
import Subjects from './subjects'

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  queueGroupName = 'payments-service'

  onMessage (data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Ticket Created:', data.id, data.title, data.price)
    msg.ack()
  }
}

export default TicketCreatedListener
