import natsClient from './nats-client'
import OrderCreatedListener from './events/listeners/order-created'

(async () => {
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

  new OrderCreatedListener(natsClient.client).listen()
})()
