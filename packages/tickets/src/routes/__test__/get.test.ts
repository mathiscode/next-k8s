import request from 'supertest'
import mongoose from 'mongoose'
import { getTokenCookie } from '@next-k8s/common'

import app from '../../app'
import { createTicket } from '../../test/utils'

describe('[List Tickets] Route: GET /api/tickets', () => {
  it('should return a list of tickets', async () => {
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    await createTicket(app, cookie)
    await createTicket(app, cookie, 'Test Event 2', 40000)
    const list = await request(app)
      .get('/api/tickets')
      .send()
      .expect(200)

    expect(list.body.tickets).toBeDefined()
    expect(list.body.tickets.length).toEqual(2)
  })
})

describe('[Get Ticket] Route: GET /api/tickets/:id', () => {
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
    const cookie = await getTokenCookie({ id: new mongoose.Types.ObjectId().toHexString() })
    const response = await createTicket(app, cookie)

    const ticket = await request(app)
      .get(`/api/tickets/${response.body.ticket.id}`)
      .send()
      .expect(200)

    expect(ticket.body.ticket.title).toEqual('Test Event')
    expect(ticket.body.ticket.price).toEqual(20000)
  })
})
