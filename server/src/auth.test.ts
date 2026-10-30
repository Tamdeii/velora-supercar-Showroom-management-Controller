import { describe, expect, it } from 'vitest'
import { canAccess, hashPassword, toSafeUser, verifyPassword } from './auth.js'

describe('authentication helpers', () => {
  it('hashes and verifies a password', () => {
    const hash = hashPassword('correct horse battery staple', 'stable-salt')
    expect(verifyPassword('correct horse battery staple', hash)).toBe(true)
    expect(verifyPassword('wrong password', hash)).toBe(false)
  })
  it('checks role permissions', () => {
    expect(canAccess('FINANCE', 'finance:write')).toBe(true)
    expect(canAccess('VIEWER', 'finance:write')).toBe(false)
  })
  it('returns an explicit safe user shape', () => {
    expect(toSafeUser({ id: '1', email: 'a@b.com', displayName: 'A', role: 'ADMIN' })).toEqual({ id: '1', email: 'a@b.com', displayName: 'A', role: 'ADMIN' })
  })
})
