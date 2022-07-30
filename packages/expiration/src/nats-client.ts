import type { Stan } from 'node-nats-streaming'
import nats from 'node-nats-streaming'

class NatsClient {
  private _client?: Stan

  get client () {
    if (!this._client) throw new Error('Cannot access NATS client before connecting')
    return this._client
  }

  async connect (clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url })

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        if (!process.env.NODE_ENV?.includes('test')) console.log('Connected to NATS')
        resolve()
      })

      this.client.on('error', (err: any) => {
        console.error(err)
        reject(err)
      })
    })
  }
}

export const natsClient = new NatsClient()
export default natsClient
