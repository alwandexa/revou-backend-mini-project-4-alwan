# revou-backend-mini-project-4-alwan

This is a RESTful API backend system for the online movie ticket booking platform. It handles various functionalities, including user authentication, movie management, and ticket booking.

## Features

- User Registration
- User Login
- Browse Movies
- Movie Details
- Book Tickets
- View Booking History
- Manage Movies (Admin Only)
- Manage Studios (Admin Only)

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySql](https://www.mysql.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/) for authentication

## Table Schema
![alt text](docs/schema.png)

## Getting Started

1. Clone the repository
2. Install the dependencies: `npm install`
3. Create the tables using `schema.sql`
4. Set up the environment variables (e.g., database connection string, JWT secret)
5. Start the server: `npm start`

## Test

To test the api, run `npm run test`.

## API Documentation

The API documentation, including the contract and request/response payloads, can be found in the `docs/` directory formatted in Postman Collection.
