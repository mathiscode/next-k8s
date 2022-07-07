import request from 'supertest'
import mongoose from 'mongoose'
import { getTokenCookie, OrderStatus } from '@next-k8s/common'

import app from '../../app'
import natsClient from '../../nats-client'
import Ticket from '../../models/ticket'

describe('[Delete Order] Route: DELETE /api/orders/:id', () => {
  it('should throw a NotFoundError if the order does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })

    await request(app)
      .put(`/api/orders/${id}`)
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 23000 })
      .expect(404)
  })

  it('should throw an UnauthorizedError if not authenticated', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    const ticket = new Ticket({ title: 'Test Ticket', price: 20000 })
    await ticket.save()

    const response = await request(app)
      .post(`/api/orders`)
      .set('Cookie', [cookie])
      .send({ ticketId: ticket.id })
      .expect(201)

    await request(app)
      .delete(`/api/orders/${response.body.order.id}`)
      .send()
      .expect(401)
  })

  it('should throw a BadRequestError if an invalid order is provided', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })

    await request(app)
      .put(`/api/orders/notarealid`)
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 20000 })
      .expect(400)
  })

  it('should throw an error on invalid order data', async () => {
    
  })

  it('should update a order', async () => {
    
  })

  it('should publish a order:updated event', async () => {
    
  })
})
