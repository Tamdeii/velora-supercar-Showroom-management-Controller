import { describe, expect, it } from 'vitest'
import { loadConfig } from './config.js'

describe('environment configuration', () => {
  it('loads and coerces supported values', () => {
    const config = loadConfig({
      NODE_ENV: 'production',
      PORT: '4100',
      JWT_SECRET: 'a'.repeat(32),
      DATABASE_URL: 'postgresql://user:password@localhost:5432/hongt',
      CLIENT_ORIGIN: 'https://hongt.example.com',
    })

    expect(config).toEqual({
      nodeEnv: 'production',
      port: 4100,
      jwtSecret: 'a'.repeat(32),
      databaseUrl: 'postgresql://user:password@localhost:5432/hongt',
      clientOrigin: 'https://hongt.example.com',
    })
  })

  it('rejects missing secrets outside test environments', () => {
    expect(() => loadConfig({ NODE_ENV: 'development' })).toThrow(
      'JWT_SECRET is required outside test environments.',
    )
  })

  it('allows the test-only secret fallback', () => {
    expect(loadConfig({ NODE_ENV: 'test' }).jwtSecret).toBe('test-only-hongt-jwt-secret-1234567890')
  })
})
