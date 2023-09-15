import type { MySqlColumn } from 'drizzle-orm/mysql-core'

import type { authors, posts, stocks } from '../drizzle/schema'

type InferMySqlColumnType<T> = T extends MySqlColumn<infer U> ? U : never
type getDataType<T> = InferMySqlColumnType<T>['data']
/**
 * Domain Data
 */
declare global {
  interface Author {
    updatedAt: getDataType<(typeof authors)['updatedAt']>
    id: getDataType<(typeof authors)['id']>
    name: getDataType<(typeof authors)['name']>
    password: getDataType<(typeof authors)['password']>
    createdAt: getDataType<(typeof authors)['createdAt']>
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
    pageTitle: getDataType<(typeof stocks)['pageTitle']>
    url: getDataType<(typeof stocks)['url']>
    createdAt: getDataType<(typeof stocks)['createdAt']>
    updatedAt: getDataType<(typeof stocks)['updatedAt']>
  }

  type StockList = Stock[]

  /**
   * Authentication
   */
  type JWTtoken = string

  type JWTpayload = Author // @TODO Omit password
}
