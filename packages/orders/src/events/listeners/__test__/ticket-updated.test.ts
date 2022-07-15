import mongoose from 'mongoose'
import { TicketUpdatedEvent } from '@next-k8s/common'
import { Message } from 'node-nats-streaming'

import natsClient from '../../../nats-client'
import TicketUpdatedListener from '../ticket-updated'
import Ticket from '../../../models/ticket'

const setup = async () => {
  const listener = new TicketUpdatedListener(natsClient.client)
  const ticket = new Ticket({ title: 'First Edition', price: 20000 })
  await ticket.save()

  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    owner: ticket.owner,
    version: ticket.version + 1,
    price: 25000,
    title: 'Second Edition',
  }

  // @ts-ignore
  const message: Message = { ack: jest.fn() }
  return { data, listener, message, ticket }
}

describe('[Listener] Ticket Updated', () => {
  it('should update a ticket', async () => {
    const { data, listener, message, ticket } = await setup()
    await listener.onMessage(data, message)
    const updatedTicket = await Ticket.findById(ticket.id)
    expect(updatedTicket.title).toEqual(data.title)
    expect(updatedTicket.price).toEqual(data.price)
    expect(updatedTicket.version).toEqual(data.version)
  })

  it('should ack the message', async () => {
    const { data, listener, message } = await setup()
    await listener.onMessage(data, message)
    expect(message.ack).toHaveBeenCalled()
  })

  it('throws an error if the ticket version is out of sync', async () => {
    const { data, listener, message } = await setup()
    data.version = 42

    try {
      await listener.onMessage(data, message)
    } catch {
      expect(message.ack).not.toHaveBeenCalled()
    }
  })
})
