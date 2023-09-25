import { sql, desc } from 'drizzle-orm'
import type { Request, Response } from 'express'

import { db } from '../../../drizzle'
import { posts } from '../../../drizzle/schema'

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
