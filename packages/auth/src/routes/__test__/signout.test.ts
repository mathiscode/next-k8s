import request from 'supertest'
import app from '../../app'

describe('Route: /api/users/signout', () => {
  it('clears cookie after signout', async () => {
    const response = await request(app)
      .get('/api/users/signout')
      .expect(200)
      
    expect(response.get('Set-Cookie')).toBeDefined()
  })
})
