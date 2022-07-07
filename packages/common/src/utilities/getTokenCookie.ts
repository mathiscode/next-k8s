import jwt from 'jsonwebtoken'

export interface GetTokenCookieOptions {
  id?: string;
  email?: string;
}

export const getTokenCookie = async (payload?: GetTokenCookieOptions) => {
  payload = payload || {} as GetTokenCookieOptions
  payload.id = payload.id || Math.random().toString(36).slice(2)
  payload.email = payload.email || 'test@test.com'
  const token = jwt.sign(payload, process.env.JWT_KEY!)
  const cookie = Buffer.from(JSON.stringify({ jwt: token })).toString('base64')
  return `session=${cookie}`
}
