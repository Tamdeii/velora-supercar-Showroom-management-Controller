import { describe, expect, it } from 'vitest'
import { canTransitionVehicleStatus } from './vehicleStateMachine.js'

describe('vehicle status state machine', () => {
  it('allows a draft vehicle to become incoming', () => {
    expect(canTransitionVehicleStatus('DRAFT', 'INCOMING')).toBe(true)
  })

  it('rejects an invalid reserved to incoming transition', () => {
    expect(canTransitionVehicleStatus('RESERVED', 'INCOMING')).toBe(false)
  })

  it('requires super admin role for sold out to available', () => {
    expect(canTransitionVehicleStatus('SOLD_OUT', 'AVAILABLE', 'INVENTORY_MANAGER')).toBe(false)
    expect(canTransitionVehicleStatus('SOLD_OUT', 'AVAILABLE', 'SUPER_ADMIN')).toBe(true)
  })

  it('does not allow transitions out of archived', () => {
    expect(canTransitionVehicleStatus('ARCHIVED', 'AVAILABLE', 'SUPER_ADMIN')).toBe(false)
  })
})
