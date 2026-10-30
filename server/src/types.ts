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
