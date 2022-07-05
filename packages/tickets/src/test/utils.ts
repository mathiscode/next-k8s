import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import request from 'supertest'

export const getTokenCookie = async () => {
  const payload = { id: new mongoose.Types.ObjectId().toHexString(), email: 'test@test.com' }
  const token = jwt.sign(payload, process.env.JWT_KEY!)
  const cookie = Buffer.from(JSON.stringify({ jwt: token })).toString('base64')
  return `session=${cookie}`
}

export const createTicket = (app: Express.Application, cookie?: string, title = 'Test Event', price = 20000, expectedStatusCode = 201) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', cookie ? [cookie] : [])
    .send({ title, price })
    .expect(expectedStatusCode)
}
