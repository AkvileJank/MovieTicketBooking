## Project requirements

#### Quick explanation

For the sake of focusing on the core functionality of the application, let's imagine this is a ticket booking system for a boutique movie theatre that has 20 seats in total for each screening. Seats are simply numerated from 1-20. Seat allocation is not included in the scope of this project.

---
### Users:

#### Movies module:

1. Get a list of movies (id, title, year) by providing a list of movies' ids

```
GET api/movies
```

Query parameters: movieId

It should return:

```
[
     {
       id: 133093,
       title: 'The Matrix',
       year: 1999,
     },
     {
       id: 816692,
       title: 'Interstellar',
       year: 2014,
     },
]
```

User input must be validated: at least one id has to be provided and it needs to be a number.

#### Screenings module:

2.  Get a list of screenings available for booking

```
  GET api/screenings
```

It should return:

```
  [
      {
        id: 1,
        timestamp: 20231116114000,
        totalTickets: 20,
        ticketsLeft: 20,
        movieTitle: 'Interstellar',
        movieYear: 2014
      }
]
```

3.  Create a booking for a screening that has tickets left

```
  POST api/screenings/:screeningId
```

Request example:

```
{
    userId: 1,
    screeningId: 1,
    bookedTickets: 2,
    seats: [1, 2]
}
```

Constraints:

- userId, screeningsId, bookedTickets must be a positive number
- bookedTickets can't be greater than total tickets available for the screening
- bookedTickets must represent the length of seats array
- seats can be a list of positive integers not greater than 20

4. Create a new screening for watching a movie

```
  POST api/screenings
```

Request example:

```
{
    movieId: 133093,
    totalTickets: 20,
    timestamp: 20231116114000
}
```

Constraints:

- totalTickets must be a positive number that is not greater than 20
- screening time must be in the future (at least on the next day)

#### Bookings module

5. Get a list of bookings a user has made

```
  GET api/users/:userId/bookings
```

It should return:

```
  [
      {
        id: 1,
        movieTitle: 'Interstellar',
        movieYear: 2014,
        screeningTimestamp: 20231116114000,
        seat: 1
        createdAt: 20231113114000,
      },
      {
        id: 2,
        movieTitle: 'Interstellar',
        movieYear: 2014,
        screeningTimestamp: 20231116114000,
        seat: 2
        createdAt: 20231113114000,
      }
]
```
---
## Database schema

### Additional tables

Screenings :

- id (integer, auto incremented, not null, primary key)
- movieId (integer, not null)
- totalTickets (integer, not null)
- timestamp (text, not null)
  Foreign key movieId references movies.id

Users:

- id (integer, auto incremented, not null, primary key)
- username (text, not null)

Bookings:

- id (integer, auto incremented, not null, primary key)
- userId (integer, not null)
- screeningId (integer, not null)
- seat (integer, not null)
  Foreign key userId references users.id
  Foreign key screeningId references screenings.id

---
## Setup

**Note:** For this exercise, we have provided an `.env` file with the database connection string. Normally, you would not commit this file to version control. We are doing it here for simplicity and given that we are using a local SQLite database.

## Database

This project should be used with the `movies.db` database in `data/` folder. It is the same database that we used in the previous exercise. You can download a fresh database [here](https://cdn.cs50.net/2022/fall/psets/7/movies.zip) or from [CS50](https://cs50.harvard.edu/x/2023/psets/7/movies/).

## Migrations

We can run migrations with the following command:

```bash

npm  run  migrate:latest

```

## Running the server

In development mode:

```bash

npm  run  dev

```

In production mode:

```bash

npm  run  start

```

## Updating types

If you make changes to the database schema, you will need to update the types. You can do this by running the following command:

```bash

npm  run  generate-types
```
