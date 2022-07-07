import request from 'supertest'
import mongoose from 'mongoose'

import app from '../../app'
import { getTokenCookie } from '../../test/utils'
import natsClient from '../../nats-client'

describe('[Update Order] Route: /api/orders/:id', () => {
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

    const response = await request(app)
      .post(`/api/orders`)
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 20000 })
      .expect(201)

    await request(app)
      .put(`/api/orders/${response.body.order.id}`)
      .send({ title: 'Test Event', price: 23000 })
      .expect(401)
  })

  it('should throw an UnauthorizedError if user does not own the order', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })

    const response = await request(app)
      .post(`/api/orders`)
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 20000 })
      .expect(201)

    const newCookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })

    await request(app)
      .put(`/api/orders/${response.body.order.id}`)
      .set('Cookie', [newCookie])
      .send({ title: 'Test Event', price: 23000 })
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
