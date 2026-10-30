import { describe, expect, it } from 'vitest'
import { getOverview, listTransactions } from './store.js'

describe('demo store', () => {
  it('returns transactions newest first', () => expect(listTransactions()[0]?.id).toBe('tx-api-1'))
  it('calculates overview totals', () => expect(getOverview()).toEqual({ income: 185000, expenses: 12400, netIncome: 172600, transactionCount: 2 }))
})
