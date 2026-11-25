import { hashPassword } from './auth.js'
import type { AuthUser, CatalogVehicle, Inquiry, InquiryStatus, Transaction } from './types.js'

type StoredUser = AuthUser & { passwordHash: string }

const users: StoredUser[] = [
  { id: 'demo-admin', email: 'admin@hongt.demo', displayName: 'Alex Morgan', role: 'ADMIN', passwordHash: hashPassword('HongTDemo123!', 'demo-salt') },
]

const transactions: Transaction[] = [
  { id: 'tx-api-1', label: 'V1 Carbon Edition sale', type: 'INCOME', amount: 185000, category: 'Sales', occurredAt: '2026-10-18T10:42:00.000Z', approved: true },
  { id: 'tx-api-2', label: 'Performance campaign', type: 'EXPENSE', amount: 12400, category: 'Advertising', occurredAt: '2026-10-17T16:18:00.000Z', approved: true },
]

const vehicles: CatalogVehicle[] = [
  {
    id: 'v1-standard',
    name: 'HongT V1 Standard Edition',
    slug: 'hongt-v1-standard-edition',
    modelYear: 2026,
    description: '4.0L Twin-Turbo V8 · 710 HP · 0–100 km/h in 2.9s',
    priceCents: 34500000,
    status: 'AVAILABLE',
    mileageKm: 0,
    horsepower: 710,
    transmission: '7-speed dual-clutch',
    fuelType: 'Petrol',
    media: [{ kind: 'IMAGE', url: '/media/vehicles/exterior/exterior-rear.png', altText: 'Rear exterior view from the HongT collection', isPrimary: true }],
  },
  {
    id: 'v1-touring',
    name: 'HongT V1 Touring Edition',
    slug: 'hongt-v1-touring-edition',
    modelYear: 2026,
    description: 'Alcantara & Quilted Leather Cabin · Adaptive Comfort Suspension · Bowers & Wilkins Audio',
    priceCents: 38900000,
    status: 'AVAILABLE',
    mileageKm: 0,
    horsepower: 710,
    transmission: '7-speed dual-clutch',
    fuelType: 'Petrol',
    media: [{ kind: 'IMAGE', url: '/media/vehicles/interior/interior-cockpit.png', altText: 'Cockpit interior from the HongT collection', isPrimary: true }],
  },
  {
    id: 'v1-carbon',
    name: 'HongT V1 Carbon Edition',
    slug: 'hongt-v1-carbon-edition',
    modelYear: 2026,
    description: 'Exposed Carbon Aero Pack · Lightweight Forged Wheels · Track Telemetry',
    priceCents: 42500000,
    status: 'SOLD_OUT',
    mileageKm: 0,
    horsepower: 710,
    transmission: '7-speed dual-clutch',
    fuelType: 'Petrol',
    media: [{ kind: 'IMAGE', url: '/media/vehicles/details/detail-carbon-mirror.png', altText: 'Carbon mirror detail from the HongT collection', isPrimary: true }],
  },
]

const inquiries: Inquiry[] = []

export function findUserByEmail(email: string): StoredUser | undefined {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

export function listTransactions(): Transaction[] {
  return [...transactions].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
}

export function getOverview() {
  const income = transactions.filter((item) => item.type === 'INCOME').reduce((total, item) => total + item.amount, 0)
  const expenses = transactions.filter((item) => item.type === 'EXPENSE').reduce((total, item) => total + item.amount, 0)
  return { income, expenses, netIncome: income - expenses, transactionCount: transactions.length }
}

export function listVehicles(): CatalogVehicle[] {
  return vehicles.map((vehicle) => ({ ...vehicle, media: vehicle.media.map((asset) => ({ ...asset })) }))
}

export function findVehicleBySlug(slug: string): CatalogVehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug)
}

export function createInquiry(input: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Inquiry {
  const inquiry: Inquiry = {
    ...input,
    id: `inq-${inquiries.length + 1}`,
    status: 'NEW',
    createdAt: new Date().toISOString(),
  }
  inquiries.push(inquiry)
  return { ...inquiry }
}

export function listInquiries(status?: InquiryStatus): Inquiry[] {
  return inquiries
    .filter((inquiry) => !status || inquiry.status === status)
    .map((inquiry) => ({ ...inquiry }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function updateInquiryStatus(id: string, status: InquiryStatus): Inquiry | undefined {
  const inquiry = inquiries.find((item) => item.id === id)
  if (!inquiry) return undefined
  inquiry.status = status
  return { ...inquiry }
}
