import { beforeAll, describe, expect, it } from 'vitest'
import type { FastifyInstance } from 'fastify'
import { buildApp } from './app.js'

describe('HongT API', () => {
  let app: FastifyInstance
  beforeAll(async () => { app = await buildApp() })
  it('exposes a health endpoint', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' })
    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ status: 'ok', service: 'hongt-api' })
  })
  it('logs in with the seeded demo account and protects overview', async () => {
    const login = await app.inject({ method: 'POST', url: '/api/auth/login', payload: { email: 'admin@hongt.demo', password: 'HongTDemo123!' } })
    expect(login.statusCode).toBe(200)
    const token = login.json().token as string
    const overview = await app.inject({ method: 'GET', url: '/api/overview', headers: { authorization: `Bearer ${token}` } })
    expect(overview.statusCode).toBe(200)
    expect(overview.json().netIncome).toBe(172600)
  })
  it('exposes the public vehicle catalog and accepts validated inquiries', async () => {
    const catalog = await app.inject({ method: 'GET', url: '/api/v1/vehicles' })
    expect(catalog.statusCode).toBe(200)
    expect(catalog.json().items).toHaveLength(3)
    expect(catalog.json().items[0].name).toBe('HongT V1 Standard Edition')

    const inquiry = await app.inject({
      method: 'POST',
      url: '/api/v1/inquiries',
      payload: {
        vehicleId: 'v1-standard',
        name: 'Jordan Lee',
        email: 'jordan@example.com',
        message: 'Please arrange a private viewing.',
      },
    })
    expect(inquiry.statusCode).toBe(201)
    expect(inquiry.json().status).toBe('NEW')
  })
  it('protects inquiry management and supports status changes', async () => {
    const login = await app.inject({ method: 'POST', url: '/api/auth/login', payload: { email: 'admin@hongt.demo', password: 'HongTDemo123!' } })
    const token = login.json().token as string
    const list = await app.inject({ method: 'GET', url: '/api/v1/inquiries', headers: { authorization: `Bearer ${token}` } })
    expect(list.statusCode).toBe(200)
    expect(list.json().items.length).toBeGreaterThan(0)

    const inquiryId = list.json().items[0].id as string
    const update = await app.inject({
      method: 'PATCH',
      url: `/api/v1/inquiries/${inquiryId}/status`,
      headers: { authorization: `Bearer ${token}` },
      payload: { status: 'CONTACTED' },
    })
    expect(update.statusCode).toBe(200)
    expect(update.json().status).toBe('CONTACTED')
  })
})
