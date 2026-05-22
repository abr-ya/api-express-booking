# Project Notes for Agents

## Project Shape

This is a small Node.js/Express REST API for a booking-style app.

- Entry point: `index.js`
- Routes: `routes/*.route.js`
- Controllers: `controllers/*.js`
- Mongoose models: `models/*.js`
- Auth/error helpers: `utils/*.js`

The app uses ES modules via `"type": "module"` in `package.json`.

## Stack

- Express 4
- MongoDB via Mongoose
- JWT auth with `jsonwebtoken`
- Password hashing with `bcryptjs`
- Cookies with `cookie-parser`
- CORS with `cors`
- Env loading with `dotenv`
- Dev server with `nodemon`

## Commands

- Start dev server: `npm run dev`
- Start production server: `npm start`

There are currently no test scripts configured.

## Environment

Expected variables are documented in `.env.spec`:

- `MONGO_USER`
- `MONGO_PASS`
- `SECRET`

MongoDB connection is assembled in `index.js` from user/pass and a hardcoded Atlas cluster host.

## API Layout

Mounted in `index.js`:

- `/api/auth` -> register/login
- `/api/users` -> user update/delete/get
- `/api/hotels` -> hotel CRUD, filtering, counts
- `/api/rooms` -> room CRUD and booking dates
- `/api/products` -> simple product list/create

## Domain Models

- `User`: username, email, profile fields, password, `isAdmin`
- `Hotel`: hotel metadata, city/type, photos, cheapest price, `rooms`
- `Room`: room details, price, max people, room numbers with booked dates
- `Product`: name, price, image

## Important Caveats

- `utils/verifyToken.js` likely has a middleware bug: `verifyUser` and `verifyAdmin` pass a callback into `verifyToken`, but `verifyToken` only accepts `(req, res, next)` and always calls the original `next`. This means role/ownership checks may not execute as intended.
- User responses are inconsistent about removing `password`; check `controllers/user.js` before exposing user data.
- Error middleware currently returns `err.stack` to clients.
- `Hotel.rooms` is stored as `[String]`; consider `ObjectId` references if relationship handling is expanded.
- `routes/users.route.js` imports only `updateUser`, `deleteUser`, and `getUser`; `getUsers` exists in the controller but is not wired to `GET /api/users`.

## Local Style

- Keep the current route/controller/model separation.
- Prefer focused fixes over broad refactors.
- Use existing helper patterns such as `createError` unless intentionally improving the architecture.
- Be careful not to overwrite unrelated user changes in this repo.
