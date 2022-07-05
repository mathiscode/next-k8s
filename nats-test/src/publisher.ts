import nats from 'node-nats-streaming'

import TicketCreatedPublisher from './events/ticket-created-publisher'

console.clear()

const client = nats.connect('next-k8s-nats', 'next-k8s-nats-ticket-publisher', { url: 'http://localhost:4222' })

client.on('connect', async () => {
  console.log('Publisher connected to NATS')
  const publisher = new TicketCreatedPublisher(client)
  await publisher.publish({ id: '1234', title: 'Ticket#1234', price: 20000 })
})
