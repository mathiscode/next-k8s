import Subjects from '../_Subjects'

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    owner: string;
    orderId?: string;
  }
}

export default TicketUpdatedEvent
