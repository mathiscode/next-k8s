import request from 'supertest'
import { getTokenCookie } from '@next-k8s/common'
import app from '../../app'
import Ticket from '../../models/ticket'
import natsClient from '../../nats-client'
import { createTicket } from '../../test/utils'

describe('[Create New Ticket] Route: /api/tickets', () => {
  it('should be a valid route', async () => {
    const response = await request(app).post('/api/tickets').send({})
    expect(response.status).not.toEqual(404)
  })

  it('should throw UnauthorizedError if unauthenticated', async () => {
    const response = await request(app).post('/api/tickets').send({})
    expect(response.status).toEqual(401)
  })

  it('should not get UnauthorizedError if authenticated', async () => {
    const cookie = await getTokenCookie()
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', [cookie])
      .send({})

    expect(response.status).not.toEqual(401)
  })

  it('should throw error if new ticket has invalid title', async () => {
    const cookie = await getTokenCookie()
    await request(app)
      .post('/api/tickets')
      .set('Cookie', [cookie])
      .send({ title: '', price: 10 })
      .expect(400)
  })

  it('should throw error if new ticket has invalid price', async () => {
    const cookie = await getTokenCookie()
    await request(app)
      .post('/api/tickets')
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: -10 })
      .expect(400)

    await request(app)
      .post('/api/tickets')
      .set('Cookie', [cookie])
      .send({ title: 'Test Event' })
      .expect(400)
  })

  it('should create a new ticket', async () => {
    let tickets = await Ticket.find({})
    const cookie = await getTokenCookie()

    await request(app)
      .post('/api/tickets')
      .set('Cookie', [cookie])
      .send({
        title: 'Test Event',
        price: 20000
      })

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
    expect(tickets[0].title).toEqual('Test Event')
    expect(tickets[0].price).toEqual(20000)
  })

  it('should publish a ticket:created event', async () => {
    const cookie = await getTokenCookie()
    await createTicket(app, cookie)
    expect(natsClient.client.publish).toHaveBeenCalled()
  })
})
