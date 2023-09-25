import bcrypt from 'bcrypt'
import type { Router, Request, Response } from 'express'
import express from 'express'
import jwt from 'jsonwebtoken'

import db from '../db/models'
import type AuthorModel from '../db/models/authorModel'
import Logger from '../lib/Logger'

import { cookieOptions } from './cookieOptions'
import {
  getAllPost,
  getPost,
  deletePost,
  createPost,
  updatePost,
} from './routes/post'
import { pushStock, getStockList, deleteStock } from './routes/stock'
import { userCount, signup } from './routes/user'

const router: Router = express.Router()

/**
 API Implementation
 */
router.get('/user_count', userCount)

router.post('/signup', signup)

router.post('/login', async ({ body }: Request, res: Response) => {
  const authorModelInstance = await db.author.findOne<AuthorModel>({
    where: { name: body.name },
  })
  if (authorModelInstance) {
    const author = authorModelInstance.toJSON() as Author
    const isValidPassword = await bcrypt.compare(body.password, author.password)

    if (isValidPassword) {
      const token: JWTtoken = jwt.sign(author, process.env.JWT_SECRET as string)
      res.cookie('token', token, cookieOptions)
      res.status(200).json(author)
    } else {
      Logger.warn('Invalid Password')
      res.status(200).json({ failed: 'Invalid Password' }) // this is bad practice in real world product. Because 'Invalid Password' imply exists user that you input at the moment.
    }
  } else {
    Logger.warn('User does not exist')
    res.status(200).json({ failed: 'User does not exist' }) // this also bad practice in real world product Same reason.
  }
})

router.get('/logout', (_req: Request, res: Response<Res.Logout>) => {
  res.cookie('token', '', { expires: new Date() })
  res.status(200).json({ message: 'Logout Successful' })
})

router.get('/post_list', getAllPost)

router.get('/post/:id', getPost)

router.delete('/post/:id', deletePost)

router.post('/create', createPost)

router.post('/update', updatePost)

router.post('/push_stock', pushStock)

router.get('/stocklist', getStockList)

router.delete('/stock/:id', deleteStock)

// @TODO add update author info handler

export default router
