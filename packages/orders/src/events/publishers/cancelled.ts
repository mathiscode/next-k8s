import { Publisher, OrderCancelledEvent, Subjects } from '@next-k8s/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}

export default OrderCancelledPublisher
