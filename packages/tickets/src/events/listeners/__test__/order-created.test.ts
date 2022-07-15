import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { OrderCreatedEvent, OrderStatus } from '@next-k8s/common'

import Ticket from '../../../models/ticket'
import natsClient from '../../../nats-client'
import OrderCreatedListener from '../order-created'

const setup = async () => {
  const listener = new OrderCreatedListener(natsClient.client)
  const ticket = new Ticket({ title: 'Test Ticket', price: 21000, owner: new mongoose.Types.ObjectId().toHexString() })
  await ticket.save()

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    owner: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: new Date().toUTCString(),
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  }

  // @ts-ignore
  const message: Message = { ack: jest.fn() }
  return { data, listener, message, ticket }
}

describe('[Order Created] Listener', () => {
  it('should set the ticket owner', async () => {
    const { data, listener, message, ticket } = await setup()
    await listener.onMessage(data, message)
    const updatedTicket = await Ticket.findById(ticket.id)
    expect(updatedTicket.orderId).toBe(data.id)
  })

  it('should ack the message', async () =>{
    const { data, listener, message } = await setup()
    await listener.onMessage(data, message)
    expect(message.ack).toHaveBeenCalled()
  })
})
