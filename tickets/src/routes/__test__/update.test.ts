import request from 'supertest'
import mongoose from 'mongoose'

import app from '../../app'
import { getTokenCookie } from '../../test/utils'

describe('[Update Ticket] Route: /api/tickets/:id', () => {
  it('should throw a NotFoundError if the ticket does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    const cookie = await getTokenCookie()

    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 23000 })
      .expect(404)
  })

  it('should throw an UnauthorizedError if not authenticated', async () => {
    const cookie = await getTokenCookie()

    const response = await request(app)
      .post(`/api/tickets`)
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 20000 })
      .expect(201)

    await request(app)
      .put(`/api/tickets/${response.body.ticket.id}`)
      .send({ title: 'Test Event', price: 23000 })
      .expect(401)
  })

  it('should throw an UnauthorizedError if user does not own the ticket', async () => {
    const cookie = await getTokenCookie()

    const response = await request(app)
      .post(`/api/tickets`)
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 20000 })
      .expect(201)

    const newCookie = await getTokenCookie()

    await request(app)
      .put(`/api/tickets/${response.body.ticket.id}`)
      .set('Cookie', [newCookie])
      .send({ title: 'Test Event', price: 23000 })
      .expect(401)
  })

  it('should throw a BadRequestError if an invalid ticket is provided', async () => {
    const cookie = await getTokenCookie()

    await request(app)
      .put(`/api/tickets/notarealid`)
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 20000 })
      .expect(400)
  })

  it('should throw an error on invalid ticket data', async () => {
    const cookie = await getTokenCookie()

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 20000 })
      .expect(201)
    
    await request(app)
      .put(`/api/tickets/${response.body.ticket.id}`)
      .set('Cookie', [cookie])
      .send({ title: '', price: 23000 })
      .expect(400)

    await request(app)
      .put(`/api/tickets/${response.body.ticket.id}`)
      .set('Cookie', [cookie])
      .send({ title: 'Test Event 2', price: -33 })
      .expect(400)
  })

  it('should update a ticket', async () => {
    const cookie = await getTokenCookie()

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', [cookie])
      .send({ title: 'Test Event', price: 20000 })
      .expect(201)
    
    const updated = await request(app)
      .put(`/api/tickets/${response.body.ticket.id}`)
      .set('Cookie', [cookie])
      .send({ title: 'New Event', price: 23000 })
      .expect(200)

    const ticket = await request(app).get(`/api/tickets/${response.body.ticket.id}`).send()

    expect(ticket.body.ticket.title).toEqual('New Event')
    expect(ticket.body.ticket.price).toEqual(23000)
  })
})
