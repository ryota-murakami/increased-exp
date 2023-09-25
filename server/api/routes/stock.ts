import { eq } from 'drizzle-orm'
import type { Request, Response, NextFunction } from 'express'

import { db } from '../../../drizzle'
import { stocks } from '../../../drizzle/schema'
import { isAuthorized } from '../../auth'
import Logger from '../../lib/Logger'

export const getStockList = async (_req: Request, res: Response) => {
  const stockList = await db.select().from(stocks)
  res.status(200).json(stockList)
}
export const pushStock = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body
  try {
    //@ts-expect-error
    await db.insert(stocks).values({
      pageTitle: body.pageTitle,
      url: body.url,
    })

    res.status(201).json({ message: 'stock added' })
  } catch (error) {
    Logger.error(error)
    next(error)
  }
}

export const deleteStock = async (req: Request, res: Response) => {
  if (!isAuthorized(req, res))
    return res.status(403).json({ message: 'unauthorized' })

  try {
    //@ts-expect-error
    await db.delete(stocks).where(eq(stocks.id, req.params.id))
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
}
