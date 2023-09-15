import { sql } from 'drizzle-orm'
import type { Handler, Request, Response } from 'express'

import { db } from '../../../drizzle'
import { authors } from '../../../drizzle/schema'
import { asyncHandler } from '../../lib/asyncHandler'

export const userCount: Handler = asyncHandler(
  async (_req: Request, res: Response<Res.GetUserCount>) => {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(authors)
    const userCount = result[0].count

    res.status(200).json({ userCount })
  },
)
