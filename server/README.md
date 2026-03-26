# Localify Server

Backend API for the Localify localization platform.

## Tech Stack

- Node.js
- NestJS
- TypeScript
- Prisma ORM (MongoDB)
- MongoDB
- JWT (placeholder auth flow)
- class-validator DTO validation
- @nestjs/config for environment variables

## Modules

- `auth` (placeholder login + JWT issue)
- `projects` (CRUD)
- `translation-keys` (CRUD + translation upsert/delete)
- `health` (service health endpoint)

## API Base

All routes are prefixed with:

```text
/api
```

## Quick Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/projects`
- `POST /api/projects`
- `PATCH /api/projects/:id`
- `DELETE /api/projects/:id`
- `GET /api/translation-keys?projectId=<projectId>`
- `POST /api/translation-keys`
- `PATCH /api/translation-keys/:id`
- `DELETE /api/translation-keys/:id`
- `PATCH /api/translation-keys/:id/translations/:languageCode`
- `DELETE /api/translation-keys/:id/translations/:languageCode`

## Prisma Notes (Prisma 7 style)

- Database connection URL is configured in `prisma.config.ts`
- `schema.prisma` contains provider/models only

## Environment

Create `.env` (or copy from `.env.example`):

```env
PORT=4000
DATABASE_URL="mongodb://localhost:27017/localify"
JWT_SECRET="dev-secret-change-me"
JWT_EXPIRES_IN="1d"
```

## Setup

```bash
npm install
```

## Prisma

```bash
npx prisma validate
npx prisma generate
npx prisma db push
```

## Run (Development)

```bash
npm run start:dev
```

Default API URL: `http://localhost:4000/api`

## Build (Production)

```bash
npm run build
npm run start:prod
```
