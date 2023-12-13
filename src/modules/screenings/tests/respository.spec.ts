import createTestDatabase from '@tests/utils/createTestDatabase'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)

describe('getScreenings', () => {
  it.todo('should return a list of screenings', async () => {
    // add movie
    await db.insertInto('movies').values({
      id: 1,
      title: 'Sherlock Holmes',
      year: 2009,
    })

    // add screening
    await db.insertInto('screenings').values({
      id: 1,
      totalTickets: 10,
      ticketsLeft: 10,
      movieId: 1,
    })
    const timestampTest = new Date().toISOString()
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

