import type { Message, Stan } from 'node-nats-streaming'
import Subjects from './_Subjects'

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject']
  abstract queueGroupName: string
  abstract onMessage (data: T['data'], msg: Message): void
  protected client: Stan
  protected ackWait = Number(process.env.LISTENER_ACK_WAIT) || 5000

  constructor (client: Stan) {
    this.client = client
  }

  subscriptionOptions () {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
  }

  listen () {
    const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions())
    subscription.on('message', (msg: Message) => {
      const { subject, queueGroupName } = this
      const data = this.parseMessage(msg)
      this.onMessage(data, msg)
    })
  }

  parseMessage (msg: Message) {
    const data = msg.getData()
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'))
  }
}

export default Listener
