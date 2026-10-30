import { hashPassword } from './auth.js'
import type { AuthUser, Transaction } from './types.js'

type StoredUser = AuthUser & { passwordHash: string }

const users: StoredUser[] = [
  { id: 'demo-admin', email: 'admin@velora.demo', displayName: 'Alex Morgan', role: 'ADMIN', passwordHash: hashPassword('VeloraDemo123!', 'demo-salt') },
]

const transactions: Transaction[] = [
  { id: 'tx-api-1', label: 'V1 Carbon Edition sale', type: 'INCOME', amount: 185000, category: 'Sales', occurredAt: '2026-10-18T10:42:00.000Z', approved: true },
  { id: 'tx-api-2', label: 'Performance campaign', type: 'EXPENSE', amount: 12400, category: 'Advertising', occurredAt: '2026-10-17T16:18:00.000Z', approved: true },
]

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
