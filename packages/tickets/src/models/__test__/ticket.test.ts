import mongoose from 'mongoose'
import Ticket from '../ticket'

describe('[Models] Ticket Model', () => {
  it('implements optimistic concurrency control', async () => {
    const ticket = new Ticket({ title: 'Test Ticket', price: 20000, owner: new mongoose.Types.ObjectId().toHexString() })
    await ticket.save()

    const copies = [
      await Ticket.findById(ticket.id),
      await Ticket.findById(ticket.id)
    ]

    copies[0].set({ price: 15000 })
    copies[1].set({ price: 23000 })

    await copies[0].save()
    
    try {
      await copies[1].save()
    } catch {
      return
    }

    throw new Error('Ticket was saved when it should not have been')
  })

  it('increments the version number on update', async () => {
    const ticket = new Ticket({ title: 'Test Ticket', price: 20000, owner: new mongoose.Types.ObjectId().toHexString() })
    await ticket.save()
    expect(ticket.version).toEqual(0)
    await ticket.save()
    expect(ticket.version).toEqual(1)
    await ticket.save()
    expect(ticket.version).toEqual(2)
  })
})