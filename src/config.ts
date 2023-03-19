import dotenv from 'dotenv'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Database {
  export const schema = 'api'
  export const username = process.env.DB_USER
  export const password = process.env.DB_USER_PWD
  export const host = process.env.DB_HOST
  export const port = parseInt(process.env.DB_PORT || "", 10)
  export const database = process.env.DB_NAME
  export const poolMin = Number(process.env.DATABASE_POOL_MIN || '0')
  export const poolMax = Number(process.env.DATABASE_POOL_MAX || '10')
  export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000')
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Server {
  export const port = Number(process.env.PORT || '8000')
  export const bodyLimit = '100kb'
  export const corsHeaders = ['Link']
  export const isDev = process.env.NODE_ENV === 'development'
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Knex {
  export const config = {
    client: process.env.CLIENT,
    connection: {
      host: process.env.DATABASE_HOSTNAME,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DB_USER_PWD,
      port: parseInt(process.env.DATABASE_PORT || "", 10),
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN,
      max: process.env.DATABASE_POOL_MAX,
      idle: process.env.DATABASE_POOL_IDLE,
    },
    migrations: {
      tableName: 'KnexMigrations',
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Redis {
  export const url = process.env.REDIS_URL
}

export default {Database, Server, Knex, Redis}
