import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'
import { NoIdProvided } from './errors'

export default (db: Database) => {
  const messages = buildRespository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req) => {
      const idString = req.query.id
      if (!idString || typeof idString !== 'string') throw new NoIdProvided()
      const ids: number[] = idString.split(',').map((id) => Number(id))
      const movies = await messages.findByIds(ids)
      return movies
    })
  )

  return router
}
