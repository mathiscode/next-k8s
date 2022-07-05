import type TicketCreatedEvent from './ticket-created-event'

import Publisher from './base-publisher'
import Subjects from './subjects'

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}

export default TicketCreatedPublisher
