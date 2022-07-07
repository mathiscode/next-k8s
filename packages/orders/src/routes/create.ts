import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@next-k8s/common'
import { body } from 'express-validator'

import Ticket from '../models/ticket'
import Order from '../models/order'

const DEFAULT_ORDER_EXPIRATION_WINDOW_SECONDS = 15 * 60

const router = express.Router()

const validateInput = [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('Ticket ID is required')
]

router.post('/api/orders', requireAuth, validateInput, validateRequest, async (req: Request, res: Response) => {
  const { ticketId } = req.body
  const ticket = await Ticket.findById(ticketId)
  const tickets = await Ticket.find({})
  if (!ticket) throw new NotFoundError('Ticket not found')

  const isReserved = await ticket.isReserved()
  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + Number(process.env.ORDER_EXPIRATION_WINDOW_SECONDS || DEFAULT_ORDER_EXPIRATION_WINDOW_SECONDS))

  if (isReserved) throw new BadRequestError('Order already exists for this ticket')

  const order = new Order({
    ticket,
    owner: req.currentUser!.id,
    expiresAt: expiration
  })

  await order.save()
  res.status(201).send({ order })
})

export default router
