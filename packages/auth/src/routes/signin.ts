import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { UnauthorizedError, validateRequest } from '@next-k8s/common'

import User from '../models/user'

const validateInput = [
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('password').trim().notEmpty().withMessage('A password must be provided')
]

const router = express.Router()
router.post('/api/users/signin', validateInput, validateRequest, async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email }).exec()
  if (!user) throw new UnauthorizedError('Incorrect username or password', 401, req.body.email)
  const validPassword = await user.verifyPassword(req.body.password)
  if (!validPassword) throw new UnauthorizedError('Incorrect username or password', 401, req.body.email)

  const token = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_KEY!)

  req.session = { jwt: token }
  res.json({ user, jwt: token })
})

export default router
