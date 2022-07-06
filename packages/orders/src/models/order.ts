import mongoose, { ObjectId } from 'mongoose'
import { OrderStatus } from '@next-k8s/common'

interface OrderAttributes {
  owner: ObjectId;
  status: OrderStatus;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
  owner: ObjectId;
  status: OrderStatus;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  ticket: TicketDoc;
}

const orderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  status: {
    type: String,
    required: true
  },

  expiresAt: {
    type: mongoose.Schema.Types.Date
  },

  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
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

export const OrderModel = mongoose.model('Order', orderSchema)
export default class Order extends OrderModel {
  constructor(attributes: OrderAttributes) {
    super(attributes)
  }
}
