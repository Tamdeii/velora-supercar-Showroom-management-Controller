import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { z } from 'zod'
import { canAccess, verifyPassword } from './auth.js'
import { loadConfig } from './config.js'
import { createInquiry, findUserByEmail, findVehicleBySlug, getOverview, listInquiries, listTransactions, listVehicles, updateInquiryStatus } from './store.js'
import type { AuthUser, InquiryStatus } from './types.js'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: AuthUser
  }
}

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) })
const inquirySchema = z.object({
  vehicleId: z.string().min(1).optional(),
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(254),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().max(2000).optional(),
  source: z.string().trim().max(80).optional(),
})
const inquiryStatusSchema = z.object({ status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM']) })

export async function buildApp(): Promise<FastifyInstance> {
  const config = loadConfig()
  const app = Fastify({ logger: true })
  await app.register(cors, { origin: config.clientOrigin })
  await app.register(jwt, { secret: config.jwtSecret })

  app.get('/health', async () => ({ status: 'ok', service: 'hongt-api' }))

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
  app.get('/api/v1/vehicles', async () => ({ items: listVehicles() }))
  app.get('/api/v1/vehicles/:slug', async (request, reply) => {
    const params = z.object({ slug: z.string().min(1) }).safeParse(request.params)
    if (!params.success) return reply.code(400).send({ error: 'Invalid vehicle slug.' })
    const vehicle = findVehicleBySlug(params.data.slug)
    if (!vehicle) return reply.code(404).send({ error: 'Vehicle not found.' })
    return vehicle
  })
  app.post('/api/v1/inquiries', async (request, reply) => {
    const result = inquirySchema.safeParse(request.body)
    if (!result.success) return reply.code(400).send({ error: 'Invalid inquiry payload.', details: result.error.flatten() })
    if (result.data.vehicleId && !listVehicles().some((vehicle) => vehicle.id === result.data.vehicleId)) {
      return reply.code(400).send({ error: 'Vehicle not found.' })
    }
    return reply.code(201).send(createInquiry(result.data))
  })
  app.get('/api/v1/inquiries', { onRequest: [requirePermission('inquiries:read')] }, async (request, reply) => {
    const query = z.object({ status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM']).optional() }).safeParse(request.query)
    if (!query.success) return reply.code(400).send({ error: 'Invalid inquiry status filter.' })
    return { items: listInquiries(query.data.status as InquiryStatus | undefined) }
  })
  app.patch('/api/v1/inquiries/:id/status', { onRequest: [requirePermission('inquiries:write')] }, async (request, reply) => {
    const params = z.object({ id: z.string().min(1) }).safeParse(request.params)
    const body = inquiryStatusSchema.safeParse(request.body)
    if (!params.success || !body.success) return reply.code(400).send({ error: 'Invalid inquiry status payload.' })
    const inquiry = updateInquiryStatus(params.data.id, body.data.status)
    if (!inquiry) return reply.code(404).send({ error: 'Inquiry not found.' })
    return inquiry
  })

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
