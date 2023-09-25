/* eslint-disable sort-keys-custom-order/object-keys */
import {
  mysqlTable,
  primaryKey,
  varchar,
  datetime,
  int,
  text,
} from 'drizzle-orm/mysql-core'

export const authors = mysqlTable(
  'authors',
  {
    id: int('id').autoincrement().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    password: text('password').notNull(),
    createdAt: datetime('createdAt', { mode: 'string' }).notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      authorsId: primaryKey(table.id),
    }
  },
)

export const posts = mysqlTable(
  'posts',
  {
    id: int('id').autoincrement().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    body: text('body').notNull(),
    createdAt: datetime('createdAt', { mode: 'string' }).notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      postsId: primaryKey(table.id),
    }
  },
)

export const stocks = mysqlTable(
  'stocks',
  {
    id: int('id').autoincrement().notNull(),
    pageTitle: text('pageTitle').notNull(),
    url: text('url').notNull(),
    createdAt: datetime('createdAt', { mode: 'string' }).notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      stocksId: primaryKey(table.id),
    }
  },
)
