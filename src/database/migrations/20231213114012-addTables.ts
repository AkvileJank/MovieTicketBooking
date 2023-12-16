import { Kysely, SqliteDatabase, sql } from 'kysely'

/** Migration used to initialize empty database tables for the test database. */
export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('screenings')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('total_tickets', 'integer')
    .addColumn('tickets_left', 'integer')
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('timestamp', 'text')
    .execute()

  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('username', 'text', (c) => c.notNull())
    .execute()

  await db.schema
    .createTable('bookings')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('user_id', 'integer', (c) => c.notNull().references('users.id'))
    .addColumn('screening_id', 'integer', (c) =>
      c.notNull().references('screenings.id')
    )
    .addColumn('seat', 'integer')
    .addColumn('created_at', 'datetime', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute()
}
