import mongoose from 'mongoose'
import Order, { OrderStatus } from './order'

interface TicketAttributes {
  _id?: mongoose.Types.ObjectId;
  id?: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>
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

export const TicketModel = mongoose.model('Ticket', ticketSchema)

export default class Ticket extends TicketModel {
  constructor(attributes: TicketAttributes) {
    if (attributes?.id) {
      attributes._id = new mongoose.Types.ObjectId(attributes.id)
      delete attributes.id
    }

    super(attributes)
  }
}
