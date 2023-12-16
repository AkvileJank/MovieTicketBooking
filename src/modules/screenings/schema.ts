import { z } from 'zod'
import type { Screenings, Bookings } from '@/database'

type Record = Screenings
export type InsertableScreening = Pick<
  Record,
  'movieId' | 'totalTickets' | 'timestamp'
>

export type InsertableBooking = Pick<
  Bookings,
  'screeningId' | 'userId' | 'seat'
>

const schema = z.object({
  id: z.number().int().positive(),
  movieId: z.coerce.number().int().positive(),
  timestamp: z.string(),
  ticketsLeft: z.number().int().positive(),
  totalTickets: z.coerce.number().int().positive(),
})

const bookingSchema = z.object({
  id: z.number().int().positive(),
  screeningId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
  seat: z.coerce.number().int().positive(),
  createdAt: z.date(),
  // todo: check if the date() is ok
})

const insertable = schema.omit({
  id: true,
  ticketsLeft: true,
})

export const insertableBooking = bookingSchema.omit({
  id: true,
  createdAt: true,
})

export const parseInsertable = (record: unknown) => insertable.parse(record)

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
