import mongoose from 'mongoose'
import { TicketCreatedEvent } from '@next-k8s/common'
import { Message } from 'node-nats-streaming'

import natsClient from '../../../nats-client'
import TicketCreatedListener from '../ticket-created'
import Ticket from '../../../models/ticket'

const setup = async () => {
  const listener = new TicketCreatedListener(natsClient.client)
  const data: TicketCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    owner: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 25000,
    title: 'Test Ticket'
  }

  // @ts-ignore
  const message: Message = { ack: jest.fn() }
  return { data, listener, message }
}

describe('[Listener] Ticket Created', () => {
  it('should create a new ticket', async () => {
    const { data, listener, message } = await setup()
    await listener.onMessage(data, message)
    const ticket = await Ticket.findById(data.id)
    expect(ticket).toBeDefined()
    expect(data.title).toEqual(data.title)
    expect(data.price).toEqual(data.price)
  })

  it('should ack the message', async () => {
    const { data, listener, message } = await setup()
    await listener.onMessage(data, message)
    const ticket = await Ticket.findById(data.id)
    expect(message.ack).toHaveBeenCalled()
  })
})
