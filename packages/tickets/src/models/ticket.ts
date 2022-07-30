import mongoose, { ObjectId } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface TicketAttributes {
  title: string;
  price: number;
  owner: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  orderId: {
    type: String
  }
}, {
  toJSON: {
    transform (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.password
    }
  }
})

ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

export const TicketModel = mongoose.model('Ticket', ticketSchema)
export default class Ticket extends TicketModel {
  constructor(attributes: TicketAttributes) {
    super(attributes)
  }
}
