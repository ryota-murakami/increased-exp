import { sql, desc, eq } from 'drizzle-orm'
import type { Request, Response } from 'express'

import { db } from '../../../drizzle'
import { posts } from '../../../drizzle/schema'
import { isAuthorized } from '../../auth'
import Logger from '../../lib/Logger'

export const getAllPost = async (
  req: Request<
    _,
    _,
    _,
    {
      page: Override<Req.PostList['page'], string>
      perPage: Override<Req.PostList['perPage'], string>
    }
  >,
  res: Response<Res.PostList>,
) => {
  const page = parseInt(req.query.page, 10)
  const perPage = parseInt(req.query.perPage, 10)
  const result = await db.select({ count: sql<number>`count(*)` }).from(posts)
  const totalCount = result[0].count

  const offset = perPage * (page - 1)
  let options
  if (0 >= offset) {
    options = {
      limit: perPage,
      offset: offset,
    }
  } else {
    options = {
      limit: perPage,
      offset: offset,
    }
  }

  const postList = await db
    .select()
    .from(posts)
    .limit(options.limit)
    .offset(options.offset)
    .orderBy(desc(posts.id))
  // @ts-expect-error
  res.status(200).json({ postList, total: totalCount })
}

export const getPost = async (req: Request, res: Response) => {
  //@ts-ignore
  const post = await db.select().from(posts).where(eq(posts.id, req.params.id))

  res.status(200).json(post)
}

export const deletePost = async (req: Request, res: Response) => {
  if (!isAuthorized(req, res))
    return res.status(403).json({ message: 'unauthorized' })

  try {
    //@ts-ignore
    await db.delete(posts).where(eq(posts.id, req.params.id))
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

export const createPost = async (req: Request, res: Response) => {
  if (!isAuthorized(req, res))
    return res.status(403).json({ message: 'unauthorized' })

  const { title, body } = req.body
  try {
    //@ts-ignore
    await db.insert(posts).values({
      title: title,
      body: body,
    })
    res.status(201).json({ message: 'New Post Created!' })
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
