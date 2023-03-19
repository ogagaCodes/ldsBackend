
/* tslint:disable await-promise */
import { Knex } from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/Config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // User
  await knex.schema.withSchema(Database.schema).createTable('User', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    // Fields
    table.string('username')
      .unique()
      .notNullable()
      .comment(`The User''s login id - usually their email address.`)

    table.string('firstName')
      .comment(`The User''s first name.`)

    table.boolean('isActive')
      .comment(`If false, the User is suspended.`)
      .defaultTo(true)
  })

  // Transactions
  await knex.schema.withSchema(Database.schema).createTable('Transaction', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    // Fields
    table.string('userId').comment('The first line of the Address.')

    table.double('amouut').comment('The second line of the Address.')

    table.string('processingState').comment('The city.')

    table.double('previousBalance').comment('The state or province.')

    table.double('currentBalance').comment('The country.')

    table.string('flow').comment('The zip or other postal code.')

    table.string('flow').comment('The zip or other postal code.')

    table.string('flow').comment('The zip or other postal code.')

  })

  // Event
  await knex.schema.withSchema(Database.schema).createTable('Event', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    // Fields
    table.string('name').notNullable().comment(`The Event''s name.`)

    table.text('description').comment(`The Event''s description`)

    // Relationships
    columns
      .foreignUuid('user', {column: 'id', table: `${Database.schema}.User`}, true)
      .comment('The User that created the Event.')

    columns
      .foreignUuid('transaction', {column: 'id', table: `${Database.schema}.Transaction`})
      .comment(`The Event''s Transaction.`)
  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
