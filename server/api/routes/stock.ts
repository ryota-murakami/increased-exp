import type { Request, Response, NextFunction } from 'express'

import { db } from '../../../drizzle'
import { stocks } from '../../../drizzle/schema'
import Logger from '../../lib/Logger'

export const getStockList = async (res: Response) => {
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
    //@ts-ignore
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
