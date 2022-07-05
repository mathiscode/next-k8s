import { Publisher, Subjects, TicketUpdatedEvent } from '@next-k8s/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}

export default TicketUpdatedPublisher
