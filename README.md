# HongT Enterprise

HongT is a Notion-inspired enterprise workspace with a premium supercar showcase. The current vertical slice includes the React dashboard, responsive navigation, KPI overview, chart/activity demo data, a showcase modal, and a typed Node.js API foundation.

## Stack

- React, Vite, TypeScript
- Fastify, Zod, JWT
- Prisma schema for PostgreSQL/Supabase
- Vitest and ESLint

## Local development

```bash
npm install
npm run dev
```

Run the API in another terminal:

```bash
npm run dev:api
```

The seeded demo account is:

```text
Email: admin@hongt.demo
Password: HongTDemo123!
```

The demo account is for local development only. Set `JWT_SECRET` and `DATABASE_URL` before deploying.

## Checks

```bash
npm test
npm run lint
npm run build
npm run build:api
```

## Database

The PostgreSQL contract is in [`prisma/schema.prisma`](./prisma/schema.prisma). With a Supabase connection string configured:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

The API currently uses a small in-memory demo store so the local UI/API can run without credentials. The next data vertical slice replaces those store functions with Prisma repositories and preserves the same route contracts.

## Free deployment path

1. Create a Supabase free project and configure `DATABASE_URL`.
2. Deploy the API to Render free as a Node web service using `npm run build:api` and `node dist-server/index.js`.
3. Deploy the Vite frontend to Vercel free using `npm run build`.
4. Set `CLIENT_ORIGIN`, `JWT_SECRET`, and `DATABASE_URL` as platform environment variables.

Free tiers may sleep, have storage/compute limits, and do not provide a 24/7 SLA.
