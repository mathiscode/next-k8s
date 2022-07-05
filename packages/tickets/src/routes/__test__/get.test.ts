import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../app'
import { createTicket, getTokenCookie } from '../../test/utils'

describe('[Get Ticket] Route: /api/tickets/:id', () => {
  it('should throw a BadRequestError if ticket ID is invalid', async () => {
    await request(app)
      .get('/api/tickets/notarealid')
      .send()
      .expect(400)
  })

  it('should throw a NotFoundError if ticket not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
      .get(`/api/tickets/${id}`)
      .send()
      .expect(404)
  })

  it('should return the fetched ticket', async () => {
    const cookie = await getTokenCookie()
    const response = await createTicket(app, cookie)

    const ticket = await request(app)
      .get(`/api/tickets/${response.body.ticket.id}`)
      .send()
      .expect(200)

    expect(ticket.body.ticket.title).toEqual('Test Event')
    expect(ticket.body.ticket.price).toEqual(20000)
  })
})
