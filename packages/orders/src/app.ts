import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { currentUser, errorHandler, NotFoundError } from '@next-k8s/common'
import routes from './routes'

const app = express()

app.disable('x-powered-by')
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }))

app.use(currentUser)
for (const route of routes) app.use(route)
app.use('*', async (req, res) => { throw new NotFoundError() })
app.use(errorHandler)

export default app
