import { Publisher, Subjects, TicketCreatedEvent } from '@next-k8s/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}

export default TicketCreatedPublisher
