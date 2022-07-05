import request from 'supertest'
import app from '../app'

export const getTokenCookie = async () => {
  const email = 'test@test.com'
  const password = 'testpass'
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)

  return response.get('Set-Cookie')
}