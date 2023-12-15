import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
import { parseInsertable } from './schema'

export default (db: Database) => {
  const screenings = buildRepository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async () => {
      const foundScreenings = await screenings.findScreenings()
      return foundScreenings
    })
  )

  router.post(
    '/',
    jsonRoute(async (req) => {
      const screening = parseInsertable(req.body)
      return screenings.addScreening(screening)
    }, StatusCodes.CREATED)
  )
  return router
}
