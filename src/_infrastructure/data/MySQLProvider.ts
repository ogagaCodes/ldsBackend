/* tslint:disable await-promise */
import Knex from 'knex'

import * as Config from '../../config'

/**
 * Initialize a new Postgres provider
 */
export async function create () {
  const knex = Knex({
    client: 'mysql',
    connection: {
      user: Config.Database.username,
      password: Config.Database.password,
      host: Config.Database.host,
      port: Config.Database.port,
      database: Config.Database.database
    },
    pool: {
      min: Config.Database.poolMin,
      max: Config.Database.poolMax,
      idleTimeoutMillis: Config.Database.poolIdle
    },
    seeds: {
      directory: './seeds/dev'
  },
    acquireConnectionTimeout: 2000
  })

  // Verify the connection before proceeding
  try {
    await knex.raw('SELECT now()')
    return knex
  } catch (error) {
    throw new Error('Unable to connect to Mysql via Knex. Ensure a valid connection.')
  }
}

export default {create}
