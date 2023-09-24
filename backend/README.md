# :rocket: Nest.js Backend Server

Welcome to the JWT Nest.js Backend project! This repository contains the backend code for a Nest.js application using JWT (JSON Web Tokens) for authentication.

## :file_folder: Folder Structure

The project follows a structured folder organization:

- `src/` - The main source code directory.
  - `common/` - Contains decorators and shared utility functions.
  - `config/` - Contains configuration files for environment variables.
  - `features/` - Contains feature modules with their DTOs (Data Transfer Objects).
  - `guards/` - Contains guard files, such as JWT (JSON Web Token) guards.
  - `interfaces/` - Houses all the interface definitions.
  - `schema/` - Contains schema definitions.

## :computer: Getting Started

To run the Nest.js application, follow these steps:

1. **Install Dependencies:**
   - Run `npm install`.

2. **Configure Environment Variables:**
   - Create a `.env` file based on `.env.example`.
   - Update it with your configuration.

3. **Build the Application:**
   - Run `npm run build`.

4. **Start the Application:**
   - Run `npm start`.

5. **Access the API:** 
   - The server runs on **PORT 3000**.
   - Open a web browser or API client and access `http://localhost:3000`.

## :hammer_and_wrench: Technologies Used

- [Nest.js](https://nestjs.com/): A powerful and extensible Node.js framework for building scalable and maintainable server-side applications.
- [Passport.js](http://www.passportjs.org/): A middleware for handling authentication in Node.js applications.
- [JWT (JSON Web Tokens)](https://jwt.io/): A standard for securely transmitting information between parties as a JSON object.

## :books: Dependencies

Here are some of the key dependencies used in this project:

- `@nestjs/common`, `@nestjs/config`, `@nestjs/jwt`, `@nestjs/mongoose`, and more for Nest.js modules.
- `bcrypt`: For password hashing.
- `mongoose`: A MongoDB object modeling library for Node.js.
- `passport` and `passport-jwt`: Middleware for authentication.
- `dotenv`: To manage environment variables.
- `rxjs`: Reactive Extensions for JavaScript.

## :wrench: Scripts

Use the following scripts for development and testing:

- `npm run start`: Start the Nest.js application.
- `npm run start:dev`: Start the application in development mode with file watching.
- `npm run lint`: Run ESLint to check and fix code style.
- `npm test`: Run unit tests.
- `npm run test:watch`: Run tests in watch mode.
- `npm run test:cov`: Run tests with coverage report.
- `npm run test:e2e`: Run end-to-end tests.

## :memo: License

This project is licensed under the UNLICENSED license.

Feel free to contribute, report issues, or provide feedback. Happy coding! :computer:
