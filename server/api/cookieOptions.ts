import { CookieOptions } from 'express'

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 365,
  sameSite: 'none',
  secure: true // 1 year cookie
}