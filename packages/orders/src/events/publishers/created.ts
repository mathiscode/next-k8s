import { Publisher, OrderCreatedEvent, Subjects } from '@next-k8s/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}

export default OrderCreatedPublisher
