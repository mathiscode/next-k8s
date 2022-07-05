import request from 'supertest'
import app from '../../app'
import { getTokenCookie } from '../../test/utils'

const createTicket = (title = 'Test Event', price = 20000, cookie?: string, expectedStatusCode = 201) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', cookie ? [cookie] : [])
    .send({ title, price })
    .expect(expectedStatusCode)
}

describe('[List Tickets] Route: /api/tickets', () => {
  it('should return a list of tickets', async () => {
    const cookie = await getTokenCookie()
    const ticketOneCreated = await createTicket('Test Event', 20000, cookie)
    const ticketTwoCreated = await createTicket('Test Event 2', 40000, cookie)
    const list = await request(app)
      .get('/api/tickets')
      .send()
      .expect(200)

    expect(list.body.tickets).toBeDefined()
    expect(list.body.tickets.length).toEqual(2)
  })
})
