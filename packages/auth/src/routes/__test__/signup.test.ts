import request from 'supertest'
import app from '../../app'

describe('Route: /api/users/signup', () => {
  it('responds with 201 to successful signup request', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'testpass' })
      .expect(201)
  })
  
  it('throws error on invalid email address during signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({ email: 'test_test com', password: 'testpass' })
      .expect(400)
  })
  
  it('throws error on invalid password during signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'te' })
      .expect(400)
  })
  
  it('throws error on missing email or password during signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: '' })
      .expect(400)
  
    await request(app)
      .post('/api/users/signup')
      .send({ email: '', password: 'testpass' })
      .expect(400)
  })
  
  it('throws error on existing email during signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'testpass' })
      .expect(201)
  
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'testpass' })
      .expect(400)
  })

  it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'testpass' })

    expect(response.get('Set-Cookie')).toBeDefined()
  })
})
