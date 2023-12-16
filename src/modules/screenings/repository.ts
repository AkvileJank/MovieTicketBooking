import type { Database } from '@/database'
import { InsertableScreening, InsertableBooking, keys } from './schema'
import createDatabase from '../../database/index'

export default (db: Database) => ({
  findScreenings: async () =>
    db
      .selectFrom('screenings')
      .leftJoin('movies', 'screenings.movieId', 'movies.id')
      .select([
        'screenings.id as id',
        'totalTickets',
        'ticketsLeft',
        'timestamp',
        'movies.title as movieTitle',
        'movies.year as movieYear',
      ])
      .execute(),

  addScreening: async (screening: InsertableScreening) =>
    db
      .insertInto('screenings')
      .values({
        ...screening,
        ticketsLeft: screening.totalTickets,
      })
      .returning(keys) // need to add schema for screenings and keys there
      .executeTakeFirst(),

  // add bookingInsertable type
  addBooking: async (booking: InsertableBooking) =>
    db
      .insertInto('bookings')
      .values({ ...booking })
      .returning(['id', 'userId', 'screeningId', 'seat', 'createdAt'])
      .executeTakeFirst(),
})
