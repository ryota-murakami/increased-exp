import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "host",
  user: "user",
  database: "database",
  
});

const db = drizzle(connection);

export default db
