# Localify Workspace

Monorepo-style workspace with separate frontend and backend apps.

## Structure

- client: Vue 3 + Vite frontend
- server: NestJS + Prisma + MongoDB backend

## Prerequisites

- Node.js 20+
- npm
- MongoDB (local or cloud)

## Setup

Install all dependencies:

1. Root tools (workspace scripts):

```bash
npm install
```

2. Client dependencies:

```bash
npm --prefix client install
```

3. Server dependencies:

```bash
npm --prefix server install
```

4. Configure backend env:

- Copy server/.env.example to server/.env
- Set DATABASE_URL and JWT_SECRET

5. Prepare Prisma client:

```bash
npm --prefix server run prisma:generate
```

## Run Both Apps (One Command)

From workspace root:

```bash
npm run dev
```

This starts:

- Server at http://localhost:4000/api
- Client at http://localhost:5173

## Other Root Commands

- Build both apps:

```bash
npm run build
```

- Run only backend:

```bash
npm run dev:server
```

- Run only frontend:

```bash
npm run dev:client
```

## App-specific Docs

- See client/README.md for frontend details
- See server/README.md for backend details
