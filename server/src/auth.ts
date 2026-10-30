import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import type { AuthUser, Role } from './types.js'

const rolePermissions: Record<Role, readonly string[]> = {
  OWNER: ['overview:read', 'finance:write', 'people:write', 'payroll:write', 'products:write', 'advertising:write'],
  ADMIN: ['overview:read', 'finance:write', 'people:write', 'payroll:write', 'products:write', 'advertising:write'],
  HR: ['overview:read', 'people:write', 'payroll:write'],
  FINANCE: ['overview:read', 'finance:write', 'payroll:read'],
  MARKETING: ['overview:read', 'products:read', 'advertising:write'],
  VIEWER: ['overview:read'],
}

export function hashPassword(password: string, salt = randomBytes(16).toString('hex')): string {
  const digest = createHash('sha256').update(`${salt}:${password}`).digest('hex')
  return `${salt}.${digest}`
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, expected] = storedHash.split('.')
  if (!salt || !expected) return false
  const actual = createHash('sha256').update(`${salt}:${password}`).digest('hex')
  return actual.length === expected.length && timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
}

export function canAccess(role: Role, permission: string): boolean {
  return rolePermissions[role].includes(permission)
}

export function toSafeUser(user: AuthUser): AuthUser {
  return { id: user.id, email: user.email, displayName: user.displayName, role: user.role }
}
