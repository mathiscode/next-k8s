import { BadRequestError, NotFoundError, UnauthorizedError, validateRequest, requireAuth } from '@next-k8s/common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { isValidObjectId } from 'mongoose'

import Ticket from '../models/ticket'

const router = express.Router()

const validateInput = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isInt({ gt: -1, lt: Number.MAX_SAFE_INTEGER }).withMessage('Price must be an integer of cents or units')
]

router.put('/api/tickets/:id', requireAuth, validateInput, validateRequest, async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new BadRequestError('Invalid Ticket ID')
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) throw new NotFoundError()
  if (ticket.owner !== req.currentUser!.id) throw new UnauthorizedError()
  ticket.set(req.body)
  await ticket.save()
  res.json(ticket)
})

export default router
