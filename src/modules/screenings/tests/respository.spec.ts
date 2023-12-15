import createTestDatabase from '@tests/utils/createTestDatabase'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)



describe('getScreenings', () => {
  it('should return a list of screenings', async () => {
    // add movie
    await db
      .insertInto('movies')
      .values({
        id: 1,
        title: 'Sherlock Holmes',
        year: 2009,
      })
      .execute()

    const timestampTest = new Date('2023-12-12').toISOString()

    // add screening
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
  it('should add new screening to database', async() => {

    const timestampTest = new Date('2023-12-13').toISOString()

    const testScreening = {
      movieId: 1,
      timestamp: timestampTest,
      totalTickets: 10
    }

    const result = await repository.addScreening(testScreening)
    expect(result).toEqual({
      id: 2,
      movieId: 1,
      timestamp: timestampTest,
      totalTickets: 10,
      ticketsLeft: 10
    })
  })
})
