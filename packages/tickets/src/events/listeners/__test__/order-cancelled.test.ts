import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { OrderCancelledEvent, OrderStatus } from '@next-k8s/common'

import Ticket from '../../../models/ticket'
import natsClient from '../../../nats-client'
import OrderCancelledListener from '../order-cancelled'

const setup = async () => {
  const owner = new mongoose.Types.ObjectId().toHexString()
  const orderId = new mongoose.Types.ObjectId().toHexString()
  const listener = new OrderCancelledListener(natsClient.client)
  const ticket = new Ticket({ title: 'Test Ticket', price: 21000, owner })

  ticket.set({ orderId })
  await ticket.save()

  const data: OrderCancelledEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id
    }
  }

  // @ts-ignore
  const message: Message = { ack: jest.fn() }
  return { data, listener, message, orderId, ticket }
}

describe('[Order Cancelled] Listener', () => {
  it('should clear the orderId of the ticket', async () => {
    const { data, listener, message, ticket } = await setup()
    await listener.onMessage(data, message)
    const updatedTicket = await Ticket.findById(ticket.id)
    expect(updatedTicket.orderId).not.toBeDefined()
  })

  it('should ack the message', async () =>{
    const { data, listener, message } = await setup()
    await listener.onMessage(data, message)
    expect(message.ack).toHaveBeenCalled()
  })

  it('should publish an order:updated event', async () => {
    const { data, listener, message } = await setup()
    await listener.onMessage(data, message)
    expect(natsClient.client.publish).toHaveBeenCalled()
  })
})
