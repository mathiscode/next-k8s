import request from 'supertest'
import app from '../../app'
import { getTokenCookie } from '../../test/utils'

describe('Route: /api/users/current', () => {
  it('responds with the current user', async () => {
    const cookie = await getTokenCookie()

    const response = await request(app)
      .get('/api/users/current')
      .set('Cookie', cookie)
      .send()
      .expect(200)

    expect(response.body.user.email).toEqual('test@test.com')
  })

  it('responds with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/current')
      .send()
      .expect(401)

    expect(response.body.user).toEqual(null)
  })
})
