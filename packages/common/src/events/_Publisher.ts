import type { Stan } from 'node-nats-streaming'

import Subjects from './_Subjects'

interface Event {
  subject: Subjects,
  data: any
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject']
  protected client: Stan

  constructor (client: Stan) {
    this.client = client
  }

  publish (data: T['data']): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), err => {
        if (err) return reject(err)
        if (!process.env.NODE_ENV?.includes('test')) console.log('Event published: ', this.subject)
        resolve(data)
      })
    })
  }
}

export default Publisher
