import OrderStatus from '../types/order-status'
import Subjects from '../_Subjects'

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled,
  data: {
    id: string;
    ticket: {
      id: string;
    }
  }
}
