export type VehicleStatus =
  | 'DRAFT'
  | 'INCOMING'
  | 'AVAILABLE'
  | 'RESERVED'
  | 'SOLD_OUT'
  | 'ARCHIVED'

const allowedTransitions: Record<VehicleStatus, ReadonlySet<VehicleStatus>> = {
  DRAFT: new Set(['INCOMING', 'AVAILABLE', 'ARCHIVED']),
  INCOMING: new Set(['AVAILABLE', 'RESERVED', 'ARCHIVED']),
  AVAILABLE: new Set(['RESERVED', 'SOLD_OUT', 'INCOMING', 'ARCHIVED']),
  RESERVED: new Set(['AVAILABLE', 'SOLD_OUT']),
  SOLD_OUT: new Set(['ARCHIVED', 'AVAILABLE']),
  ARCHIVED: new Set(),
}

export function canTransitionVehicleStatus(
  currentStatus: VehicleStatus,
  nextStatus: VehicleStatus,
  actorRole?: string,
): boolean {
  if (currentStatus === 'SOLD_OUT' && nextStatus === 'AVAILABLE') {
    return actorRole === 'SUPER_ADMIN'
  }

  return allowedTransitions[currentStatus].has(nextStatus)
}
