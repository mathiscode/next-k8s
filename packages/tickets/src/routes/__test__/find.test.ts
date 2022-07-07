
import mongoose from 'mongoose'
import request from 'supertest'
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
