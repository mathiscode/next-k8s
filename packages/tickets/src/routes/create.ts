import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@next-k8s/common'

import Ticket from '../models/ticket'
import TicketCreatedPublisher from '../events/publishers/created'
import natsClient from '../nats-client'

const router = express.Router()

const validateInput = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isInt({ gt: -1, lt: Number.MAX_SAFE_INTEGER }).withMessage('Price must be an integer of cents or units')
]

router.post('/api/tickets', requireAuth, validateInput, validateRequest, async (req: Request, res: Response) => {
  const { title, price } = req.body
  const ticket = new Ticket({ title, price, owner: req.currentUser!.id })
  await ticket.save()
  new TicketCreatedPublisher(natsClient.client).publish({ id: ticket.id, version: ticket.version, title: ticket.title, price: ticket.price, owner: ticket.owner })
  res.status(201).send({ ticket })
})

export default router
