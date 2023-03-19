import { Knex } from 'knex'
import {Redis} from 'ioredis'

import MYSQLProvider from './MySQLProvider'
import RedisProvider from './RedisProvider'

export interface DataClient {
  mysql: Knex,
  redis: Redis,
}

export async function create (): Promise<DataClient> {
  return {
    mysql: await MYSQLProvider.create(),
    redis: await RedisProvider.create(),
  }
}

export default {create}
