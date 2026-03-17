# StoreAPI

A RESTful Web API built with ASP.NET Core using N-Layer Architecture, featuring JWT authentication, refresh token rotation, HTTP-only cookies, and full Docker support.

## Tech Stack

**Backend**
- ASP.NET Core 10 Web API
- Entity Framework Core 10
- PostgreSQL
- FluentValidation
- JWT + Refresh Token Rotation
- HTTP-only Cookies
- BCrypt password hashing

**Frontend**
- Angular *(coming soon)*
- Angular Material / PrimeNG *(coming soon)*

**DevOps**
- Docker & Docker Compose
- pgAdmin (via Docker)

---

## Architecture

```
StoreAPI/
├── DataAccessLayer/          # EF Core models, enums, DbContext, exceptions
│   ├── Models/               # User, Product, RefreshToken
│   ├── Enums/                # Role
│   ├── Context/              # AppDbContext
│   └── Exceptions/           # AppException, EmailAlreadyExistsException, UnauthorizedException
├── BusinessLogicLayer/       # Business logic, DTOs, services, validators
│   ├── DTOs/
│   │   ├── Auth/             # RegisterDto, LoginDto, AuthResponseDto, UserInfoDto
│   │   ├── User/             # UserDto, CreateUserDto, UpdateUserDto
│   │   └── Product/          # ProductDto, CreateProductDto, UpdateProductDto
│   ├── Interfaces/           # IAuthService, IUserService, IProductService
│   ├── Services/             # AuthService, UserService, ProductService
│   └── Validators/           # FluentValidation validators
└── StoreAPI/                 # Controllers, middleware, Program.cs
    ├── Controllers/          # AuthController, UserController, ProductController
    └── Middleware/           # ExceptionMiddleware
```

---

## Features

- [x] Product CRUD (protected routes)
- [x] User CRUD (Admin only)
- [x] User registration & login
- [x] JWT authentication
- [x] Refresh token rotation
- [x] HTTP-only cookie for refresh token
- [x] BCrypt password hashing
- [x] Global exception middleware
- [x] Custom exceptions with HTTP status codes
- [x] FluentValidation
- [x] Docker & Docker Compose
- [x] pgAdmin via Docker
- [ ] Angular frontend with reusable components

---

## Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/)
- [Docker](https://www.docker.com/)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/StoreAPI.git
cd StoreAPI
```

2. **Create `.env` file in the root folder**

```env
DB_CONNECTION_STRING=Host=db;Port=5432;Database=storeapi_db;Username=postgres;Password=your_password
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=storeapi_db
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
JWT_ISSUER=StoreAPI
JWT_AUDIENCE=StoreAPIClient
JWT_EXPIRY_MINUTES=15
```

> `.env` is only used in Development. In production, set environment variables directly or via Docker Compose.

3. **Run with Docker**

```bash
docker compose up --build
```

Migrations are applied automatically on startup.

API will be available at `http://localhost:8080`.

---

## API Endpoints

### Auth

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | No | Register new user, returns JWT |
| POST | `/api/auth/login` | No | Login, returns JWT |
| POST | `/api/auth/refresh` | Cookie | Refresh access token |
| POST | `/api/auth/logout` | Cookie | Logout, revokes refresh token |

### Products

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/product` | Admin | Get all products |
| GET | `/api/product/{id}` | Admin | Get product by ID |
| POST | `/api/product` | Admin | Create product |
| PATCH | `/api/product/{id}` | Admin | Update product |
| DELETE | `/api/product/{id}` | Admin | Delete product |

### Users

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/user` | Admin | Get all users |
| GET | `/api/user/{id}` | Admin | Get user by ID |
| POST | `/api/user` | Admin | Create user |
| PATCH | `/api/user/{id}` | Admin | Update user |
| DELETE | `/api/user/{id}` | Admin | Delete user |

---

## Docker Services

```bash
docker compose up --build
```

| Service | Description | URL |
|---------|-------------|-----|
| `api` | ASP.NET Core Web API | `http://localhost:8080` |
| `db` | PostgreSQL | `localhost:5433` |
| `pgadmin` | pgAdmin UI | `http://localhost:5050` |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DB_CONNECTION_STRING` | PostgreSQL connection string |
| `POSTGRES_USER` | PostgreSQL username |
| `POSTGRES_PASSWORD` | PostgreSQL password |
| `POSTGRES_DB` | PostgreSQL database name |
| `PGADMIN_DEFAULT_EMAIL` | pgAdmin login email |
| `PGADMIN_DEFAULT_PASSWORD` | pgAdmin login password |
| `JWT_SECRET` | Secret key for JWT signing (min 32 chars) |
| `JWT_ISSUER` | JWT issuer |
| `JWT_AUDIENCE` | JWT audience |
| `JWT_EXPIRY_MINUTES` | JWT expiry in minutes (default: 15) |

---

## License

MIT
