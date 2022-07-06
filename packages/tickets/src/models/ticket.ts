import mongoose, { ObjectId } from 'mongoose'

interface TicketAttributes {
  title: String;
  price: Number;
  owner: ObjectId;
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
    type: String,
    required: true
  }
}, {
  toJSON: {
    versionKey: false,
    transform (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.password
    }
  }
})

export const TicketModel = mongoose.model('Ticket', ticketSchema)
export default class Ticket extends TicketModel {
  constructor(attributes: TicketAttributes) {
    super(attributes)
  }
}
