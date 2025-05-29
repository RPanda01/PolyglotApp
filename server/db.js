import sql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true
  }
}

console.log('DB_SERVER:', process.env.DB_SERVER)
const pool = await sql.connect(config)
export default pool