import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from 'mysql2/promise'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// create the connection
const poolConnection = mysql.createPool({
  database: 'digital',
  host: 'localhost',
  multipleStatements: true,
  password: 'rootpass',
  port: 3306,
  user: 'root',
})

const db = drizzle(poolConnection)

// this will automatically run needed migrations on the database
await migrate(db, { migrationsFolder: join(__dirname, '../drizzle') })
