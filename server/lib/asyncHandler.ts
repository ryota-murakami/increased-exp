import type { Request, Response, NextFunction, Handler } from 'express'
export const asyncHandler =
  (fn: Handler) => async (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
  }
