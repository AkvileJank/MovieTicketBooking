import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import createApp from '@/app'

const db = await createTestDatabase()

const app = createApp(db)

// add movie
db.insertInto('movies')
  .values({
    id: 1,
    title: 'Sherlock Holmes',
    year: 2009,
  })
  .execute()

// add screening
const timestampTest = new Date('2023-12-12').toISOString()

db.insertInto('screenings')
  .values({
    id: 1,
    timestamp: timestampTest,
    totalTickets: 10,
    ticketsLeft: 10,
    movieId: 1,
  })
  .execute()

describe('GET', () => {
  it('should return all screenings', async () => {
    const { body } = await supertest(app).get('/screenings').expect(200)
    expect(body).toHaveLength(1)
    expect(body).toEqual([
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

describe('POST', () => {
  it('should add new screening', async () => {
    const testScreening = {
      movieId: 1,
      timestamp: timestampTest,
      totalTickets: 10,
    }

    await supertest(app).post('/screenings').send(testScreening).expect(201)

    const screenings = await db.selectFrom('screenings').selectAll().execute()
    expect(screenings).toHaveLength(2)
    expect(screenings).toEqual([
      {
        id: 1,
        timestamp: timestampTest,
        totalTickets: 10,
        ticketsLeft: 10,
        movieId: 1,
      },
      {
        id: 2,
        movieId: 1,
        timestamp: timestampTest,
        totalTickets: 10,
        ticketsLeft: 10,
      },
    ])
  })
})
