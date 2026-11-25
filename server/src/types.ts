export type Role = 'OWNER' | 'ADMIN' | 'HR' | 'FINANCE' | 'MARKETING' | 'VIEWER'

export type AuthUser = {
  id: string
  email: string
  displayName: string
  role: Role
}

export type Transaction = {
  id: string
  label: string
  type: 'INCOME' | 'EXPENSE'
  amount: number
  category: string
  occurredAt: string
  approved: boolean
}

export type VehicleStatus = 'DRAFT' | 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'SOLD_OUT' | 'ARCHIVED'

export type CatalogVehicle = {
  id: string
  name: string
  slug: string
  modelYear: number
  description: string
  priceCents: number
  status: VehicleStatus
  mileageKm: number
  horsepower: number
  transmission: string
  fuelType: string
  media: Array<{ kind: 'IMAGE' | 'VIDEO'; url: string; altText?: string; isPrimary: boolean }>
}

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED' | 'SPAM'

export type Inquiry = {
  id: string
  vehicleId?: string
  name: string
  email: string
  phone?: string
  message?: string
  source?: string
  status: InquiryStatus
  createdAt: string
}
