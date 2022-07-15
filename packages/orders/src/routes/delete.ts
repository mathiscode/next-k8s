import { BadRequestError, NotFoundError, OrderStatus, requireAuth } from '@next-k8s/common'
import express, { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import Order from '../models/order'
import OrderCancelledPublisher from '../events/publishers/cancelled'
import natsClient from '../nats-client'

const router = express.Router()

router.delete('/api/orders/:id', requireAuth, async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new BadRequestError('Invalid Ticket ID')
  const order = await Order.findById(req.params.id).populate('ticket')
  if (!order) throw new NotFoundError('Order not found')
  if (order.owner.toHexString() !== req.currentUser!.id) throw new NotFoundError('Order not found') // same error to prevent probing
  order.status = OrderStatus.Cancelled
  await order.save()

  new OrderCancelledPublisher(natsClient.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id
    }
  })

  res.status(204).send({ order })
})

export default router
