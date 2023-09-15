import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

let db: ReturnType<typeof drizzle>
;(async () => {
  const connection = await mysql.createConnection({
    database: 'digital',
    host: 'localhost',
    password: 'rootpass',
    port: 3306,
    user: 'root',
  })

  db = drizzle(connection)
})()

export { db }
