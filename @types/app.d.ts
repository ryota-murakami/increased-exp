import type { MySqlColumn } from 'drizzle-orm/mysql-core'

import type { authors } from '../drizzle/schema'

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

  declare interface Post {
    id: number
    title: string
    body: string
    createdAt: string
    updatedAt: string
  }

  declare type Posts = Post[]

  declare interface Stock {
    id: number
    pageTitle: string
    url: string
    createdAt: string
    updatedAt: string
  }

  declare type StockList = Stock[]

  /**
   * Authentication
   */
  declare type JWTtoken = string

  declare type JWTpayload = Author // @TODO Omit password
}
