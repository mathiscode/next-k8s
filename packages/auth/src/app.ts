import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError } from '@next-k8s/common'

import User from './models/user'

import currentUserRouter from './routes/current-user'
import signinRouter from './routes/signin'
import signoutRouter from './routes/signout'
import signupRouter from './routes/signup'

if (!process.env.JWT_KEY) throw new Error('JWT_KEY secret not set')

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.use('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export default app
