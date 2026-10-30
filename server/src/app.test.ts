import { beforeAll, describe, expect, it } from 'vitest'
import type { FastifyInstance } from 'fastify'
import { buildApp } from './app.js'

describe('Velora API', () => {
  let app: FastifyInstance
  beforeAll(async () => { app = await buildApp() })
  it('exposes a health endpoint', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' })
    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ status: 'ok', service: 'velora-api' })
  })
  it('logs in with the seeded demo account and protects overview', async () => {
    const login = await app.inject({ method: 'POST', url: '/api/auth/login', payload: { email: 'admin@velora.demo', password: 'VeloraDemo123!' } })
    expect(login.statusCode).toBe(200)
    const token = login.json().token as string
    const overview = await app.inject({ method: 'GET', url: '/api/overview', headers: { authorization: `Bearer ${token}` } })
    expect(overview.statusCode).toBe(200)
    expect(overview.json().netIncome).toBe(172600)
  })
})
