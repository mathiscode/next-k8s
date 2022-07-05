import { BadRequestError, NotFoundError } from '@next-k8s/common'
import express, { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import Ticket from '../models/ticket'

const router = express.Router()

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new BadRequestError('Invalid Ticket ID')
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) throw new NotFoundError()
  res.json({ ticket })
})

export default router
