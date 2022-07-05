import request from 'supertest'
import app from '../../app'
import { createTicket, getTokenCookie } from '../../test/utils'

describe('[List Tickets] Route: /api/tickets', () => {
  it('should return a list of tickets', async () => {
    const cookie = await getTokenCookie()
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
