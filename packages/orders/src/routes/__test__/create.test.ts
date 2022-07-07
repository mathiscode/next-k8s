import mongoose from 'mongoose'
import request from 'supertest'
import { getTokenCookie, OrderStatus } from '@next-k8s/common'
import app from '../../app'
import Order from '../../models/order'
import Ticket, { TicketModel } from '../../models/ticket'
import natsClient from '../../nats-client'

describe('[Create New Order] Route: POST /api/orders', () => {
  it('should be a valid route', async () => {
    const response = await request(app).post('/api/orders').send({})
    expect(response.status).not.toEqual(404)
  })

  it('should throw UnauthorizedError if unauthenticated', async () => {
    const response = await request(app).post('/api/orders').send({})
    expect(response.status).toEqual(401)
  })

  it('should not get UnauthorizedError if authenticated', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    const response = await request(app)
      .post('/api/orders')
      .set('Cookie', [cookie])
      .send({})

    expect(response.status).not.toEqual(401)
  })

  it('should throw NotFoundError if ticket is not found', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    const id = new mongoose.Types.ObjectId()

    await request(app)
      .post('/api/orders')
      .set('Cookie', [cookie])
  })

  it('should throw BadRequestError if new order has invalid ticketId', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    await request(app)
      .post('/api/orders')
      .set('Cookie', [cookie])
      .send({ ticketId: 'notarealid' })
      .expect(400)
  })

  it('should throw BadRequestError if new order is already reserved', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    const ticket = new Ticket({ title: 'Test Ticket', price: 20000 })
    await ticket.save()

    const order = new Order({
      ticket,
      owner: new mongoose.Types.ObjectId().toHexString(),
      status: OrderStatus.Created,
      expiresAt: new Date()
    })

    await order.save()
    await request(app)
      .post('/api/orders')
      .set('Cookie', [cookie])
      .expect(400)
  })

  it('should create a new order', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    const ticket = new Ticket({ title: 'Test Ticket', price: 20000 })
    await ticket.save()

    await request(app)
      .post('/api/orders')
      .set('Cookie', [cookie])
      .send({ ticketId: ticket.id })
      .expect(201)
  })

  it.todo('should publish an order:created event')
  // , async () => {
  //   const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
  //   const ticket = new Ticket({ title: 'Test Ticket', price: 20000 })
  //   await ticket.save()
  //   expect(natsClient.client.publish).toHaveBeenCalled()
  // })
})
