import express, { Request, Response } from 'express'
import { BadRequestError, NotFoundError, requireAuth } from '@next-k8s/common'
import { isValidObjectId } from 'mongoose'

import Order from '../models/order'

const router = express.Router()

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({ owner: req.currentUser!.id }).populate('ticket')
  res.send({ orders })
})

router.get('/api/orders/:id', requireAuth, async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new BadRequestError('Invalid Ticket ID')
  const order = await Order.findById(req.params.id).populate('ticket')
  if (!order) throw new NotFoundError('Order not found')
  if (order.owner.toHexString() !== req.currentUser!.id) throw new NotFoundError('Order not found') // same error to prevent probing
  res.send({ order })
})

export default router
