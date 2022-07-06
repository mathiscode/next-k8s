import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@next-k8s/common'
import { body } from 'express-validator'

const router = express.Router()

const validateInput = [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('Ticket ID is required')
]

router.post('/api/orders', requireAuth, validateInput, validateRequest, async (req: Request, res: Response) => {
  res.send({})
})

export default router
