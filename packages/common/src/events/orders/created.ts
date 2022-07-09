import OrderStatus from '../types/order-status'
import Subjects from '../_Subjects'

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated,
  data: {
    id: string;
    status: OrderStatus,
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    }
  }
}
