import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { z } from 'zod'
import { canAccess, verifyPassword } from './auth.js'
import { findUserByEmail, getOverview, listTransactions } from './store.js'
import type { AuthUser } from './types.js'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: AuthUser
  }
}

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) })

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: true })
  await app.register(cors, { origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' })
  await app.register(jwt, { secret: process.env.JWT_SECRET ?? 'local-development-only-change-me' })

  app.get('/health', async () => ({ status: 'ok', service: 'velora-api' }))

  app.post('/api/auth/login', async (request, reply) => {
    const result = loginSchema.safeParse(request.body)
    if (!result.success) return reply.code(400).send({ error: 'Invalid email or password format.' })
    const user = findUserByEmail(result.data.email)
    if (!user || !verifyPassword(result.data.password, user.passwordHash)) return reply.code(401).send({ error: 'Invalid email or password.' })
    const safeUser = { id: user.id, email: user.email, displayName: user.displayName, role: user.role } satisfies AuthUser
    return { user: safeUser, token: await app.jwt.sign(safeUser) }
  })

  app.get('/api/auth/me', { onRequest: [async (request, reply) => {
    try { await request.jwtVerify() } catch { return reply.code(401).send({ error: 'Authentication required.' }) }
  }] }, async (request) => ({ user: request.user }))

  app.get('/api/overview', { onRequest: [requirePermission('overview:read')] }, async () => getOverview())
  app.get('/api/transactions', { onRequest: [requirePermission('overview:read')] }, async () => ({ items: listTransactions() }))

  return app
}

function requirePermission(permission: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
      if (!canAccess(request.user.role, permission)) return reply.code(403).send({ error: 'You do not have permission to access this resource.' })
    } catch {
      return reply.code(401).send({ error: 'Authentication required.' })
    }
  }
}
