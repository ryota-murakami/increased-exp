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
    createdAt: datetime('createdAt', { mode: 'string' }).notNull(),
    id: int('id').autoincrement().notNull(),
    name: varchar('name', { length: 255 }),
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
    body: text('body'),
    createdAt: datetime('createdAt', { mode: 'string' }).notNull(),
    id: int('id').autoincrement().notNull(),
    title: varchar('title', { length: 255 }),
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
    createdAt: datetime('createdAt', { mode: 'string' }).notNull(),
    id: int('id').autoincrement().notNull(),
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
