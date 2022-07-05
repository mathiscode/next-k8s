import express, { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { BadRequestError, DatabaseConnectionError, validateRequest } from '@next-k8s/common'

import User from '../models/user'

const router = express.Router()

const validateInput = [
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').trim().isLength({ min: 4, max: 32 }).withMessage('Password must be between 4 and 32 characters')
]

router.post('/api/users/signup', validateInput, validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body
  const exists = await User.exists({ email: email.toLowerCase() })
  if (exists) throw new BadRequestError('User already exists')

  try {
    const user = new User({ email: email.toLowerCase(), password })
    await user.save()

    const token = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!)

    req.session = { jwt: token }
    res.status(201).json({ user, jwt: token })
  } catch (err) {
    console.error(err)
    throw new DatabaseConnectionError('Failed to insert user')
  }
})

export default router
