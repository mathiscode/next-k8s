import express, { Request, Response } from 'express'
import { currentUser } from '@next-k8s/common'
// import { currentUser } from '../../../common/src'

const router = express.Router()
router.get('/api/users/current', currentUser, async (req: Request, res: Response) => {
  res.status(!req.currentUser ? 401 : 200).json({ user: req.currentUser || null })
})

export default router
