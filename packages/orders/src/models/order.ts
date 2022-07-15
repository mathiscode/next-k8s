import mongoose, { ObjectId } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { OrderStatus } from '@next-k8s/common'
import { TicketDoc } from './ticket'

interface OrderAttributes {
  owner: string;
  status?: OrderStatus;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  ticket: TicketDoc | object;
}

interface OrderDoc extends mongoose.Document {
  owner: string;
  status: OrderStatus;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  ticket: TicketDoc;
  version: number;
}

const orderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
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

orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

export { OrderStatus }

export const OrderModel = mongoose.model('Order', orderSchema)
export default class Order extends OrderModel {
  constructor(attributes: OrderAttributes) {
    super(attributes)
  }
}
