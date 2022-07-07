import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../app'
import { getTokenCookie } from '@next-k8s/common'

describe('[Get Order] Route: /api/orders/:id', () => {
  it('should throw a BadRequestError if order ID is invalid', async () => {
    await request(app)
      .get('/api/orders/notarealid')
      .send()
      .expect(400)
  })

  it('should throw a NotFoundError if order not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
      .get(`/api/orders/${id}`)
      .send()
      .expect(404)
  })

  it('should return the fetched order', async () => {

  })
})
