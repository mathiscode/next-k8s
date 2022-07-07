import { BadRequestError, NotFoundError, OrderStatus, requireAuth } from '@next-k8s/common'
import express, { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import Order from '../models/order'

const router = express.Router()

router.delete('/api/orders/:id', requireAuth, async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new BadRequestError('Invalid Ticket ID')
  const order = await Order.findById(req.params.id).populate('ticket')
  if (!order) throw new NotFoundError('Order not found')
  if (order.owner.toHexString() !== req.currentUser!.id) throw new NotFoundError('Order not found') // same error to prevent probing
  order.status = OrderStatus.Cancelled
  await order.save()
  res.status(204).send({ order })
})

export default router
