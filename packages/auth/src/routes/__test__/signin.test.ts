import request from 'supertest'
import app from '../../app'

beforeEach(() => {
  return request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'testpass' })
})

describe('Route: /api/users/signin', () => {
  it('responds with 200 to successful signin request', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({ email: 'test@test.com', password: 'testpass' })
      .expect(200)
  })
  
  it('throws error on invalid email address during signin', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({ email: 'test_test com', password: 'testpass' })
      .expect(400)
  })

  it('throws error on missing email or password during signin', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({ email: 'test@test.com', password: '' })
      .expect(400)
  
    await request(app)
      .post('/api/users/signin')
      .send({ email: '', password: 'testpass' })
      .expect(400)
  })

  it('sets a cookie after successful signin', async () => {
    const response = await request(app)
      .post('/api/users/signin')
      .send({ email: 'test@test.com', password: 'testpass' })
      .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
  })
})
