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
    name: varchar('name', { length: 255 }),
    createdAt: datetime('createdAt', { mode: 'string' }).notNull(),
    password: text('password'),
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
    title: varchar('title', { length: 255 }),
    body: text('body'),
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
    createdAt: datetime('createdAt', { mode: 'string' }).notNull(),
    pageTitle: text('pageTitle'),
    updatedAt: datetime('updatedAt', { mode: 'string' }).notNull(),
    url: text('url'),
  },
  (table) => {
    return {
      stocksId: primaryKey(table.id),
    }
  },
)
