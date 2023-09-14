import type { Config } from 'drizzle-kit'

export default {
  dbCredentials: {
    connectionString: process.env.DB_URL!,
    database: 'digital',
    host: 'localhost',
    password: 'rootpass',
    port: 3306,
    user: 'root',
  },
  driver: 'mysql2',
} satisfies Config
