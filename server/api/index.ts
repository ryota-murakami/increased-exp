import bcrypt from 'bcrypt'
import express from 'express'
import type { Router, CookieOptions, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { isAuthorized } from '../auth'
import db from '../db/models'
import type AuthorModel from '../db/models/authorModel'
import Logger from '../lib/Logger'

import {
  getAllPost,
  getPost,
  deletePost,
  createPost,
  updatePost,
} from './routes/post'
import { pushStock, getStockList } from './routes/stock'
import { userCount } from './routes/user'

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 365,
  sameSite: 'none',
  secure: true, // 1 year cookie
}

const router: Router = express.Router()

/**
 API Implementation
 */
router.get('/user_count', userCount)

router.post(
  '/signup',
  async (req: Request<_, _, Req.SignUp>, res: Response<Res.SignUp>) => {
    const body = req.body
    if (!(body?.name && body?.password)) {
      Logger.warn('Empty Post Content. Might be data not formatted properly.')
      return res.status(400).json({
        error: 'Empty Post Content. Might be data not formatted properly.',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(body.password, salt)

    try {
      const modelInstance = await db.author.create<AuthorModel>({
        name: body.name,
        password: hash,
      })
      const author: JWTpayload = modelInstance.toJSON() as Author

      const token: JWTtoken = jwt.sign(author, process.env.JWT_SECRET as string)
      res.cookie('token', token, cookieOptions)
      res.status(201).json(author)
    } catch (error: unknown) {
      if (error instanceof Error) {
        Logger.error(error)
        res.status(500).json({ error: error.message })
      } else {
        Logger.error(error)
        res.status(500).json({
          error: `something wrong: ${JSON.stringify(error)}`,
        })
      }
    }
  },
)

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

router.delete('/stock/:id', async (req, res) => {
  if (!isAuthorized(req, res))
    return res.status(403).json({ message: 'unauthorized' })

  try {
    await db.stock.destroy({ where: { id: req.params.id } })
    res.status(200).json({ message: 'Delete Successful!' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(error)
      res.status(500).json({ message: error.message })
    } else {
      Logger.error(error)
      res
        .status(500)
        .json({ message: `someting wrong: ${JSON.stringify(error)}` })
    }
  }
})

// @TODO add update author info handler

export default router
