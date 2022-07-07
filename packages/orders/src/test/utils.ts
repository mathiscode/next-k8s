import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const getTokenCookie = async () => {
  const payload = { id: new mongoose.Types.ObjectId().toHexString(), email: 'test@test.com' }
  const token = jwt.sign(payload, process.env.JWT_KEY!)
  const cookie = Buffer.from(JSON.stringify({ jwt: token })).toString('base64')
  return `session=${cookie}`
}
