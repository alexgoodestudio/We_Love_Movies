# We Love Movies API

## Overview

Welcome to the We Love Movies API! This project is a comprehensive backend solution designed to serve a frontend application. It provides users with access to data about movies, theaters, and reviews.

## Features

### Movies
- **List All Movies**: `GET /movies`
- **List Currently Showing Movies**: `GET /movies?is_showing=true`
- **Read One Movie**: `GET /movies/:movieId`
- **Get Theaters for a Movie**: `GET /movies/:movieId/theaters`
- **Get Reviews for a Movie**: `GET /movies/:movieId/reviews`

### Reviews
- **Delete a Review**: `DELETE /reviews/:reviewId`
- **Update a Review**: `PUT /reviews/:reviewId`

### Theaters
- **List All Theaters**: `GET /theaters`

## Technologies Used

- **Node.js**: For server-side logic
- **Express**: For routing and middleware
- **Knex**: For query building and database interactions
- **PostgreSQL**: As the relational database
- **Jest**: For testing
- **Supertest**: For HTTP assertions

## Database Schema

The database consists of the following tables:
- Critics
- Movies
- Movies_Theaters (Join Table)
- Reviews
- Theaters

## Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up the database**: `knex migrate:latest`
4. **Seed the database**: `knex seed:run`
5. **Start the server**: `npm start`

## Testing

The project includes a suite of tests built with Jest. To run the tests, execute `npm test`.

## Future Enhancements

- Add user authentication and authorization
- Implement a caching layer for improved performance
- Extend the API to include additional features like user ratings

## Contributing

Feel free to fork the project and submit a pull request. All contributions are welcome!

## License

This project is open-source and available under the MIT License.

