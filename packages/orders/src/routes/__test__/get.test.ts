import request from 'supertest'
import mongoose from 'mongoose'
import { getTokenCookie } from '@next-k8s/common'

import app from '../../app'
import Ticket from '../../models/ticket'

describe('[Get my Orders] Route: GET /api/orders', () => {
  it ('should fetch orders belonging to the user', async () => {
    const tickets = [
      new Ticket({ title: 'Test Ticket', price: 20000 }),
      new Ticket({ title: 'Test Ticket 2', price: 30000 }),
      new Ticket({ title: 'Test Ticket 3', price: 40000 })
    ]

    for await (const ticket of tickets) ticket.save()

    const users = [
      await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() }),
      await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    ]

    // Test subject will be User B

    // Create user A's order
    const { body: userAOrder1 } = await request(app)
      .post('/api/orders')
      .set('Cookie', [users[0]])
      .send({ ticketId: tickets[0].id })
      .expect(201)

    // Create user B's order
    const { body: userBOrder1 } = await request(app)
      .post('/api/orders')
      .set('Cookie', [users[1]])
      .send({ ticketId: tickets[1].id })
      .expect(201)

    // Create user B's order
    const { body: userBOrder2 } = await request(app)
      .post('/api/orders')
      .set('Cookie', [users[1]])
      .send({ ticketId: tickets[2].id })
      .expect(201)
    
    // Get user B's orders
    const { body: userBOrders } = await request(app)
      .get('/api/orders')
      .set('Cookie', [users[1]])
      .send()
      .expect(200)

    expect(userBOrders.orders).toHaveLength(2)
    expect(userBOrders.orders[0].id).toEqual(userBOrder1.order.id)
    expect(userBOrders.orders[1].id).toEqual(userBOrder2.order.id)
    expect(userBOrders.orders[0].ticket.id).toEqual(tickets[1].id)
  })
})

describe('[Get an Order] Route: GET /api/orders/:id', () => {
  it('should throw a BadRequestError if order ID is invalid', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    await request(app)
      .get('/api/orders/notarealid')
      .set('Cookie', [cookie])
      .send()
      .expect(400)
  })

  it('should throw an UnauthorizedError if not signed in', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
      .get(`/api/orders/${id}`)
      .send()
      .expect(401)
  })

  it('should return the fetched order', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    const ticket = new Ticket({ title: 'Test Event', price: 20000 })
    await ticket.save()

    const { body: orderResponse } = await request(app)
      .post('/api/orders')
      .set('Cookie', [cookie])
      .send({ ticketId: ticket.id })
      .expect(201)

    const { order } = orderResponse

    const { body: details } = await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Cookie', [cookie])
      .send()
      .expect(200)

    expect(details.order.id).toEqual(order.id)
  })
})
