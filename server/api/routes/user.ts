import bcrypt from 'bcrypt'
import { sql } from 'drizzle-orm'
import type { Handler, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { db } from '../../../drizzle'
import { authors } from '../../../drizzle/schema'
import { asyncHandler } from '../../lib/asyncHandler'
import Logger from '../../lib/Logger'
import { cookieOptions } from '../cookieOptions'

export const userCount: Handler = asyncHandler(
  async (_req: Request, res: Response<Res.GetUserCount>) => {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(authors)
    const userCount = result[0].count

    res.status(200).json({ userCount })
  },
)

export const signup = async (
  req: Request<_, _, Req.SignUp>,
  res: Response<Res.SignUp>,
) => {
  const body = req.body
  if (!(body?.name && body?.password)) {
    Logger.warn('Empty Post Content. Might be data not formatted properly.')
    return res.status(400).json({
      error: 'Empty Post Content. Might be data not formatted properly.',
    })
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(body.password, salt)
  const author = {
    name: body.name,
    password: hash,
  }
  try {
    //@ts-ignore
    await db.insert(authors).values(author)

    const token: JWTtoken = jwt.sign(author, process.env.JWT_SECRET as string)
    res.cookie('token', token, cookieOptions)
    res.status(201).json({ message: 'Signup Successful!' })
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
}
