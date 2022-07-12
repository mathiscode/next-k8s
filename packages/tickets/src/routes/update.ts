import { BadRequestError, NotFoundError, UnauthorizedError, validateRequest, requireAuth } from '@next-k8s/common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import Ticket from '../models/ticket'
import TicketUpdatedPublisher from '../events/publishers/updated'
import natsClient from '../nats-client'

const router = express.Router()

const validateInput = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isInt({ gt: -1, lt: Number.MAX_SAFE_INTEGER }).withMessage('Price must be an integer of cents or units')
]

router.put('/api/tickets/:id', requireAuth, validateInput, validateRequest, async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new BadRequestError('Invalid Ticket ID')
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) throw new NotFoundError()
  if (ticket.owner.toHexString() !== req.currentUser!.id) throw new UnauthorizedError()
  const { title, price } = req.body
  ticket.set({ title, price })
  await ticket.save()
  await new TicketUpdatedPublisher(natsClient.client).publish({ id: ticket.id, title: ticket.title, price: ticket.price, owner: ticket.owner })
  res.json(ticket)
})

export default router
