# API Express Booking

REST API for a booking application built with Express and MongoDB.

## Stack

- Node.js
- Express 4
- MongoDB + Mongoose
- JWT authentication
- bcryptjs for password hashing
- cookie-parser for cookie handling
- cors
- dotenv
- nodemon for development

## Quick Start

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.spec` as an example:

```env
MONGO_USER=your_mongo_user
MONGO_PASS=your_mongo_password
SECRET=your_jwt_secret
```

Start in development mode:

```bash
npm run dev
```

Start with Node.js:

```bash
npm start
```

By default, the server runs at:

```text
http://localhost:8800
```

## Architecture

```text
index.js                 # entry point, middleware, routes, and MongoDB connection
routes/                  # Express routes
controllers/             # request handlers
models/                  # Mongoose models
utils/                   # auth/error helpers
```

Main request flow:

```text
client -> route -> controller -> model -> MongoDB
```

## Main Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### Users

```http
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

These routes use JWT user verification.

### Hotels

```http
GET    /api/hotels
GET    /api/hotels/:id
GET    /api/hotels/with-rooms/:id
GET    /api/hotels/countByCity?cities=moscow,paris,london
GET    /api/hotels/countByType
POST   /api/hotels
PUT    /api/hotels/:id
DELETE /api/hotels/:id
```

Creating, updating, and deleting hotels require an admin JWT.

`GET /api/hotels` supports filtering with query parameters, for example:

```http
GET /api/hotels?city=moscow&min=100&max=500&limit=10
```

### Rooms

```http
GET    /api/rooms
GET    /api/rooms/:id
POST   /api/rooms/:hotelid
PUT    /api/rooms/:id
PUT    /api/rooms/booking/:id
DELETE /api/rooms/:id/:hotelid
```

Creating, updating, and deleting rooms require an admin JWT. Date booking is available through `/api/rooms/booking/:id`.

### Products

```http
GET  /api/products
POST /api/products
```

Creating a product requires an admin JWT.

## ENV

Required variables:

| Variable | Description |
| --- | --- |
| `MONGO_USER` | MongoDB Atlas user |
| `MONGO_PASS` | MongoDB Atlas password |
| `SECRET` | secret used to sign JWT tokens |

The MongoDB URL is assembled in `index.js` from `MONGO_USER`, `MONGO_PASS`, and a hardcoded Atlas cluster host.

## Authentication

After login/register, the API returns a JWT in JSON and sets the `access_token` cookie.

Protected routes read the token from:

```http
Authorization: Bearer <token>
```

or from the cookie:

```text
access_token=<token>
```

## Update To TypeScript

Recommended migration plan:

1. Install TypeScript tooling:

```bash
npm install -D typescript tsx @types/node @types/express
```

2. Add `tsconfig.json` with ES module support and Node-friendly settings.

3. Update scripts in `package.json`:

```json
{
  "dev": "tsx watch index.ts",
  "start": "node dist/index.js",
  "build": "tsc"
}
```

4. Rename project files from `.js` to `.ts`.

5. Update local imports to match the TypeScript build strategy.

6. Type Express handlers:

```ts
import type { Request, Response, NextFunction } from "express";
```

7. Add interfaces for Mongoose models:

- `User`
- `Hotel`
- `Room`
- `Product`

8. Extend the Express `Request` type for JWT user data:

```ts
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        isAdmin: boolean;
      };
    }
  }
}
```

9. Validate required env variables before using them, especially `MONGO_USER`, `MONGO_PASS`, and `SECRET`.

10. Replace direct `_doc` usage with safer object conversion, for example `.toObject()`.

11. Fix and type the auth middleware flow in `utils/verifyToken`.

12. Build and run the project:

```bash
npm run build
npm run dev
```

Expected complexity: low to medium. The project is small and already split into clear `routes`, `controllers`, `models`, and `utils` layers, so the migration can be done incrementally.
