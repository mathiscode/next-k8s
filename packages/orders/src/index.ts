import mongoose from 'mongoose'

import natsClient from './nats-client'
import app from './app'
import TicketCreatedListener from './events/listeners/ticket-created'
import TicketUpdatedListener from './events/listeners/ticket-updated'

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY is undefined')
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is undefined')
  if (!process.env.NATS_URL) throw new Error('NATS_URL is undefined')
  if (!process.env.NATS_CLUSTER_ID) throw new Error('NATS_CLUSTER_ID is undefined')
  if (!process.env.NATS_CLIENT_ID) throw new Error('NATS_CLIENT_ID is undefined')

  await natsClient.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)

  natsClient.client.on('close', () => {
    if (!process.env.NODE_ENV?.includes('test')) console.log('NATS connection closed')
    process.exit()
  })

  process.on('SIGINT', () => natsClient.client.close())
  process.on('SIGTERM', () => natsClient.client.close())

  new TicketCreatedListener(natsClient.client).listen()
  new TicketUpdatedListener(natsClient.client).listen()

  await mongoose.connect(process.env.MONGO_URI)
  console.log('Database connected!')
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log('Service running on port:', port)
  })
}

start()
