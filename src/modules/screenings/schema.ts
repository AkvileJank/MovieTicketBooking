import { z } from 'zod'
import type { Screenings } from '@/database'

type Record = Screenings
export type InsertableScreening = Pick<Record, 'movieId' | 'totalTickets' | 'timestamp'>

const schema = z.object({
  id: z.number().int().positive(),
  movieId: z.coerce.number().int().positive(),
  timestamp: z.string(),
  ticketsLeft: z.number().int().positive(),
  totalTickets: z.coerce.number().int().positive(),
})

const insertable = schema.omit({
  id: true,
  ticketsLeft: true,
})

export const parseInsertable = (record: unknown) => insertable.parse(record)

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
