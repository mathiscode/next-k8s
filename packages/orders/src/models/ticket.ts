import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import Order, { OrderStatus } from './order'

export interface ITicket extends mongoose.Model<TicketDoc> {
  findByEvent(data: any): Promise<TicketDoc>;
}

interface TicketAttributes {
  _id?: mongoose.Types.ObjectId;
  id?: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  version: number;
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  toJSON: {
    versionKey: false,
    transform (doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.methods.isReserved = async function () {
  const orderExists = await Order.countDocuments({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.Pending,
        OrderStatus.Complete
      ]
    }
  })

  return !!orderExists
}

ticketSchema.statics.findByEvent = async (event: { id: string, version: number }): Promise<TicketDoc | null> => {
  return TicketModel.findOne({ _id: event.id, version: event.version - 1 })
}

export const TicketModel = mongoose.model('Ticket', ticketSchema)

export default class Ticket extends TicketModel {
  constructor(attributes: TicketAttributes) {
    if (attributes?.id) {
      attributes._id = new mongoose.Types.ObjectId(attributes.id)
      delete attributes.id
    }

    super(attributes)
    return this
  }
}
