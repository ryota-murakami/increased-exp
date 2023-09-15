import type { MySqlColumn } from 'drizzle-orm/mysql-core'

import type { authors, posts, stocks } from '../drizzle/schema'

type InferMySqlColumnType<T> = T extends MySqlColumn<infer U> ? U : never
type getDataType<T> = InferMySqlColumnType<T>['data']
/**
 * Domain Data
 */
declare global {
  interface Author {
    id: getDataType<(typeof authors)['id']>
    name: getDataType<(typeof authors)['name']>
    createdAt: getDataType<(typeof authors)['createdAt']>
    password: getDataType<(typeof authors)['password']>
    updatedAt: getDataType<(typeof authors)['updatedAt']>
  }

  interface Post {
    id: getDataType<(typeof posts)['id']>
    title: getDataType<(typeof posts)['title']>
    body: getDataType<(typeof posts)['body']>
    createdAt: getDataType<(typeof posts)['createdAt']>
    updatedAt: getDataType<(typeof posts)['updatedAt']>
  }

  type Posts = Post[]

  interface Stock {
    id: getDataType<(typeof stocks)['id']>
    createdAt: getDataType<(typeof stocks)['createdAt']>
    pageTitle: getDataType<(typeof stocks)['pageTitle']>
    updatedAt: getDataType<(typeof stocks)['updatedAt']>
    url: getDataType<(typeof stocks)['url']>
  }

  type StockList = Stock[]

  /**
   * Authentication
   */
  type JWTtoken = string

  type JWTpayload = Author // @TODO Omit password
}
