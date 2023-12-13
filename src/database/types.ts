import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Bookings {
  id: Generated<number>;
  movieId: number;
  screeningId: number;
  seat: number | null;
  createdAt: string | null;
}

export interface Directors {
  movieId: number;
  personId: number;
}

export interface Movies {
  id: Generated<number>;
  title: string;
  year: number | null;
}

export interface People {
  id: Generated<number>;
  name: string;
  birth: number | null;
}

export interface Ratings {
  movieId: number;
  rating: number;
  votes: number;
}

export interface Screenings {
  id: Generated<number>;
  totalTickets: number | null;
  ticketsLeft: number | null;
  movieId: number;
  timestamp: string | null;
}

export interface Stars {
  movieId: number;
  personId: number;
}

export interface DB {
  bookings: Bookings;
  directors: Directors;
  movies: Movies;
  people: People;
  ratings: Ratings;
  screenings: Screenings;
  stars: Stars;
}
