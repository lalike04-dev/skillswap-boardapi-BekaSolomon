# SkillSwap Board API

A RESTful API built with **Node.js**, **Express**, and **Prisma ORM** for a skill exchange platform where users can offer or request skills.

---

## 📖 Project Overview

SkillSwap Board API is the backend service for a skill-sharing marketplace. Users can:

- Create listings to offer or request skills.
- Browse and filter listings by skill, type, or user.
- Respond to listings and accept/reject responses.
- Manage user profiles and skills.

Built with modern JavaScript (ESM), PostgreSQL, and Prisma for type-safe database access.

---

## 🗄️ Database Design

### Models

#### `users`
| Field  | Type         | Description           |
|--------|--------------|-----------------------|
| `id`   | `Int`        | Primary key, auto-inc |
| `name` | `String(100)`| User's full name      |
| `email`| `String(255)`| Unique email address  |

#### `listings`
| Field         | Type            | Description                         |
|---------------|-----------------|-------------------------------------|
| `id`          | `Int`           | Primary key, auto-inc               |
| `title`       | `String(255)`   | Listing title                       |
| `description` | `String`        | Detailed description                |
| `list_type`   | `Enum`          | `Offering` or `Recieving` (note typo) |

#### `skills`
| Field         | Type            | Description                         |
|---------------|-----------------|-------------------------------------|
| `id`          | `Int`           | Primary key, auto-inc               |
| `name`        | `String`        | Unique skill name                   |
| `description` | `String(255)`   | Skill description                   |

#### `skill_listing` (junction)
| Field       | Type  | Description                    |
|-------------|-------|--------------------------------|
| `listingid` | `Int` | Foreign key → `listings.id`   |
| `skillid`   | `Int` | Foreign key → `skills.id`     |
| **PK**      |       | Composite `(listingid, skillid)` |

#### `responses`
| Field       | Type     | Description                           |
|-------------|----------|---------------------------------------|
| `userid`    | `Int`    | Foreign key → `users.id`             |
| `listingid` | `Int`    | Foreign key → `listings.id`          |
| `response`  | `String` | Response message                      |
| `accepted`  | `Boolean`| Default `false`                       |
| **PK**      |          | Composite `(userid, listingid)`       |

---

## 🔗 Entity Relationship Diagram

```
┌─────────────┐       ┌──────────────────┐       ┌─────────────┐
│    users    │       │    listings      │       │   skills    │
├─────────────┤       ├──────────────────┤       ├─────────────┤
│ id (PK)     │───┐   │ id (PK)          │───┐   │ id (PK)     │
│ name        │   │   │ title            │   │   │ name (UK)   │
│ email (UK)  │   │   │ description      │   │   │ description │
└─────────────┘   │   │ list_type (enum) │   │   └─────────────┘
                   │   └──────────────────┘   │          │
                   │          │               │          │
                   │          │               └──────────┘
                   │          │                      │
                   │   ┌──────▼──────┐        ┌──────▼──────┐
                   └───│  responses  │        │skill_listing│
                       ├─────────────┤        ├─────────────┤
                       │ userid (PK) │        │ listingid   │
                       │ listingid   │        │ skillid     │
                       │ response    │        └─────────────┘
                       │ accepted    │
                       └─────────────┘
```

**Relationships:**
- `users` 1 : N `responses`
- `listings` 1 : N `responses`
- `listings` N : N `skills` (via `skill_listing`)

---

## 🌐 API Endpoints

| Method | Endpoint               | Description                         |
|--------|------------------------|-------------------------------------|
| GET    | `/api/listings`        | Get all listings (with filters)     |
| GET    | `/api/listings/:id`    | Get a single listing by ID          |
| POST   | `/api/listings`        | Create a new listing                |
| PUT    | `/api/listings/:id`    | Update a listing                    |
| DELETE | `/api/listings/:id`    | Delete a listing                    |
| GET    | `/api/skills`          | Get all skills                      |
| POST   | `/api/skills`          | Create a new skill                  |
| GET    | `/api/users`           | Get all users                       |
| GET    | `/api/users/:id`       | Get user by ID                      |
| POST   | `/api/users`           | Create a new user                   |
| GET    | `/api/responses`       | Get all responses                   |
| POST   | `/api/responses`       | Create a response to a listing      |
| PATCH  | `/api/responses`       | Accept/reject a response            |

> **Note:** All endpoints are relative to the base URL (e.g., `http://localhost:3000`).

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lalike04-dev/skillswap-boardapi-BekaSolomon.git
   cd skillswap-boardapi-BekaSolomon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL credentials:
     ```env
     DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME"
     ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed the database (optional)**
   ```bash
   npx prisma db seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
   Server will run at `http://localhost:3000`.

---

## 📁 Folder Structure

```
skillswap-boardapi-BekaSolomon/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Auto-generated migration files
├── src/
│   ├── app.js                 # Express app entry point
│   ├── routes/                # API route handlers
│   ├── controllers/           # Business logic
│   ├── services/              # Database services (Prisma client)
│   └── generated/prisma/      # Prisma client (auto-generated)
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
├── prisma.config.ts           # Prisma configuration
└── readme.md
```

---

## 🔍 Filters

The `GET /api/listings` endpoint supports query parameters for filtering:

| Parameter    | Type     | Example                        | Description                         |
|--------------|----------|--------------------------------|-------------------------------------|
| `skill`      | `string` | `?skill=JavaScript`            | Filter by skill name                |
| `list_type`  | `string` | `?list_type=Offering`          | Filter by listing type              |
| `user_id`    | `int`    | `?user_id=1`                   | Filter by user (via responses)      |
| `search`     | `string` | `?search=web`                  | Search in title/description         |
| `limit`      | `int`    | `?limit=10`                    | Pagination: number of results       |
| `offset`     | `int`    | `?offset=20`                   | Pagination: skip N results          |

---

## 📮 Example Requests

### 1. Create a new listing
```http
POST /api/listings
Content-Type: application/json

{
  "title": "Learn React from a pro",
  "description": "I offer 1-on-1 React mentoring sessions.",
  "list_type": "Offering",
  "skills": ["React", "JavaScript"]
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Learn React from a pro",
  "description": "I offer 1-on-1 React mentoring sessions.",
  "list_type": "Offering",
  "skills": [
    { "id": 1, "name": "React" },
    { "id": 2, "name": "JavaScript" }
  ]
}
```

### 2. Get all listings (filtered)
```http
GET /api/listings?skill=React&list_type=Offering&limit=5
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Learn React from a pro",
      "description": "I offer 1-on-1 React mentoring sessions.",
      "list_type": "Offering",
      "skills": [{ "id": 1, "name": "React" }]
    }
  ],
  "pagination": { "limit": 5, "offset": 0, "total": 1 }
}
```

### 3. Create a response to a listing
```http
POST /api/responses
Content-Type: application/json

{
  "userid": 3,
  "listingid": 1,
  "response": "I'd love to learn React! When are you available?"
}
```

**Response:**
```json
{
  "userid": 3,
  "listingid": 1,
  "response": "I'd love to learn React! When are you available?",
  "accepted": false
}
```

### 4. Accept a response
```http
PATCH /api/responses
Content-Type: application/json

{
  "userid": 3,
  "listingid": 1,
  "accepted": true
}
```

**Response:**
```json
{
  "userid": 3,
  "listingid": 1,
  "response": "I'd love to learn React! When are you available?",
  "accepted": true
}
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (ESM)
- **Framework:** Express 5.x
- **ORM:** Prisma 7.x
- **Database:** PostgreSQL
- **Language:** TypeScript (via `tsx`)
- **Other:** dotenv, pg

---

## 📝 Notes

- The `list_type` enum in the schema uses `Recieving` (misspelled). Be consistent when using this value.
- The Prisma client is generated into `src/generated/prisma` – do not edit manually.
- All responses are in JSON format.