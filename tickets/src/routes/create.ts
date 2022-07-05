import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@next-k8s/common'
// import { requireAuth } from '../../../common/src'

import Ticket from '../models/ticket'

const router = express.Router()

const validateInput = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isInt({ gt: -1, lt: Number.MAX_SAFE_INTEGER }).withMessage('Price must be an integer of cents or units')
]

router.post('/api/tickets', requireAuth, validateInput, validateRequest, async (req: Request, res: Response) => {
  const { title, price } = req.body
  const ticket = new Ticket({ title, price, owner: req.currentUser!.id })
  await ticket.save()
  
  res.status(201).send({ ticket })
})

export default router
