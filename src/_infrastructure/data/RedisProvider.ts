import IORedis, {Redis} from 'ioredis'

import * as Config from '../../config'

export async function create () {
  if (!Config.Redis.url) throw new Error('No Redis url found.')

  return new Promise<Redis>((resolve, reject) => {
    const redis = new IORedis(Config.Redis.url || "")

    redis.on('ready', () => resolve(redis))
    redis.on('error', reject)
  })
}

export default {create}
