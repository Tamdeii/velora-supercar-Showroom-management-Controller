import { z } from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  JWT_SECRET: z.string().min(32).optional(),
  DATABASE_URL: z.string().url().optional(),
  CLIENT_ORIGIN: z.string().url().default('http://localhost:5173'),
})

export type AppConfig = {
  nodeEnv: 'development' | 'test' | 'production'
  port: number
  jwtSecret: string
  databaseUrl?: string
  clientOrigin: string
}

export function loadConfig(environment: Record<string, string | undefined> = process.env): AppConfig {
  const result = environmentSchema.safeParse(environment)

  if (!result.success) {
    const details = result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
    throw new Error(`Invalid environment configuration: ${details}`)
  }

  const { NODE_ENV: nodeEnv, PORT: port, JWT_SECRET: configuredSecret, DATABASE_URL: databaseUrl, CLIENT_ORIGIN: clientOrigin } = result.data
  if (!configuredSecret && nodeEnv !== 'test') {
    throw new Error('Invalid environment configuration: JWT_SECRET is required outside test environments.')
  }

  return {
    nodeEnv,
    port,
    jwtSecret: configuredSecret ?? 'test-only-velora-jwt-secret-1234567890',
    databaseUrl,
    clientOrigin,
  }
}
