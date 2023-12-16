import createTestDatabase from '@tests/utils/createTestDatabase'
import buildRepository from '../repository'
import screenings from '@/modules/screenings/controller';

const db = await createTestDatabase()
const repository = buildRepository(db)

const timestampTest = new Date('2023-12-12').toISOString()

await db
  .insertInto('movies')
  .values({
    id: 1,
    title: 'Sherlock Holmes',
    year: 2009,
  })
  .execute()

await db
  .insertInto('screenings')
  .values({
    id: 1,
    timestamp: timestampTest,
    totalTickets: 10,
    ticketsLeft: 10,
    movieId: 1,
  })
  .execute()

describe('getScreenings', () => {
  it('should return a list of screenings', async () => {
    const screenings = await repository.findScreenings()

    expect(screenings).toHaveLength(1)
    expect(screenings).toEqual([
      {
        id: 1,
        totalTickets: 10,
        ticketsLeft: 10,
        movieTitle: 'Sherlock Holmes',
        movieYear: 2009,
        timestamp: timestampTest,
      },
    ])
  })
})

describe('addScreening', () => {
  it('should add new screening to database', async () => {
    const testScreening = {
      movieId: 1,
      timestamp: timestampTest,
      totalTickets: 10,
    }

    const result = await repository.addScreening(testScreening)
    expect(result).toEqual({
      id: 2,
      movieId: 1,
      timestamp: timestampTest,
      totalTickets: 10,
      ticketsLeft: 10,
    })
  })
})

describe('addBooking', () => {
  it('should create new booking for a screening', async () => {
    // add a user
    await db
      .insertInto('users')
      .values({
        id: 1,
        username: 'test',
      })
      .execute()

    const testBooking = {
      userId: 1,
      screeningId: 1,
      seat: 1
    }

    const timestamp = new Date().toISOString()
    const result = await repository.addBooking(testBooking)
    expect(result).toEqual({
      id: 1,
      ...testBooking,
      createdAt: timestamp
    })
  })
})
