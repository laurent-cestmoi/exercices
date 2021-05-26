import * as dotenv from 'dotenv'
import path from 'path'

const envPath = path.join(
  __dirname,
  // J'utilise un seul fichier .env pour l'instant
  // `../../.env.${process.env.NODE_ENV || 'development'}`
  `../../.env`
)

dotenv.config({ path: envPath })

export const PORT = Number(process.env.PORT)
//export const JWT_SECRET = process.env.JWT_SECRET
export const DB_PORT = Number(process.env.PGPORT)
export const DB_HOST = process.env.PGHOST
export const DB_NAME = process.env.PGDATABASE
export const DB_USER = process.env.PGUSER
export const DB_PASSWORD = process.env.PGPASSWORD
export const DB_SUPERUSER = process.env.PGSUPERUSER
export const DB_SUPERPASSWORD = process.env.PGSUPERPASSWORD