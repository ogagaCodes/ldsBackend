/* tslint:disable await-promise */
import { Knex } from 'knex'

import {DataClient} from '../_infrastructure/data'
import {Database} from '../config'

export interface Event {
  name: string,
  description?: string,
  user: string,
  address?: string,
}

export interface Data {
  get: ReturnType<typeof getEvent>,
  getList: ReturnType<typeof getEventList>,
}

export interface GetInput {
  id: string,
}

export const getEvent = (events: () => Knex.QueryBuilder) => async (input: GetInput) => {
  return (await events().select().where({id: input.id}) as Event[])[0]
}

export interface GetListInput {
  user: string,
}

export const getEventList = (events: () => Knex.QueryBuilder) => async (input?: GetListInput) => {
  const query = events().select()
  if (input) query.where({user: input.user})

  return (await query as Event[])
}

export async function create (data: DataClient): Promise<Data> {
  const events = () => data.mysql.withSchema(Database.schema).table('Event')

  return {
    get: getEvent(events),
    getList: getEventList(events),
  }
}

export default {create}
