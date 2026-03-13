# StoreAPI

A RESTful Web API built with ASP.NET Core using N-Layer Architecture, featuring JWT authentication, product management, and full Docker support.

## Tech Stack

**Backend**
- ASP.NET Core 10 Web API
- Entity Framework Core 10
- PostgreSQL
- FluentValidation
- JWT + Refresh Tokens
- HTTP-only Cookies

**Frontend**
- Angular
- Angular Material / PrimeNG

**DevOps**
- Docker & Docker Compose
- pgAdmin (via Docker)

---

## Architecture

```
StoreAPI/
├── DataAccessLayer/       # EF Core models, enums, DbContext
│   ├── Models/
│   ├── Enums/
│   └── Context/
├── BusinessLogicLayer/    # Business logic, DTOs, validators
│   ├── DTOs/
│   ├── Interfaces/
│   ├── Services/
│   └── Validators/
└── StoreAPI/              # Controllers, middleware, Program.cs
    └── Controllers/
```

---

## Features

- [x] Product CRUD (protected routes)
- [ ] User registration & login
- [ ] JWT authentication
- [ ] Refresh token rotation
- [ ] HTTP-only cookie auth
- [ ] Angular frontend with reusable components
- [ ] Docker & Docker Compose setup
- [ ] pgAdmin via Docker

---

## Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/) (for frontend)
- [Docker](https://www.docker.com/) (optional)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/StoreAPI.git
cd StoreAPI
```

2. **Create `.env` file in the root folder**

```env
DB_CONNECTION_STRING=Host=localhost;Port=5432;Database=storeapi_db;Username=postgres;Password=your_password
JWT_SECRET=your_jwt_secret_key
```

> `.env` is only used in Development. In production, set environment variables directly or via Docker Compose.

3. **Apply migrations**

```bash
dotnet ef database update --project DataAccessLayer --startup-project StoreAPI
```

4. **Run the API**

```bash
dotnet run --project StoreAPI
```

API will be available at `http://localhost:5000`.

---

## API Endpoints

### Products

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/product` | No | Get all products |
| GET | `/api/product/{id}` | No | Get product by ID |
| POST | `/api/product` | Yes | Create product |
| PATCH | `/api/product/{id}` | Yes | Update product |
| DELETE | `/api/product/{id}` | Yes | Delete product |

### Auth *(coming soon)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT via HTTP-only cookie |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout, clears cookie |

---

## Docker *(coming soon)*

```bash
docker-compose up --build
```

Services:
- `api` – ASP.NET Core Web API
- `db` – PostgreSQL
- `pgadmin` – pgAdmin on `http://localhost:5050`

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DB_CONNECTION_STRING` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |

---

## License

MIT
