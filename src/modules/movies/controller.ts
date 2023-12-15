import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
import { NoIdProvided } from './errors'

export default (db: Database) => {
  const movies = buildRepository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req) => {
      const idString = req.query.id
      if (!idString || typeof idString !== 'string') throw new NoIdProvided()
      const ids: number[] = idString.split(',').map((id) => Number(id))
      const foundMovies = await movies.findByIds(ids)
      return foundMovies
    })
  )

  return router
}
