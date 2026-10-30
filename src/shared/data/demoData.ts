export type Metric = {
  label: string
  value: string
  change: number
  detail: string
  tone: 'green' | 'purple' | 'blue' | 'orange'
}

export type Transaction = {
  id: string
  label: string
  date: string
  type: 'income' | 'expense' | 'payroll'
  income: number
  expense: number
}

export const overviewMetrics: Metric[] = [
  { label: 'Total revenue', value: '$842,940', change: 12.8, detail: 'vs. last month', tone: 'green' },
  { label: 'Net income', value: '$658,620', change: 18.4, detail: 'vs. last month', tone: 'purple' },
  { label: 'Active people', value: '48', change: 4.2, detail: 'vs. last month', tone: 'blue' },
  { label: 'Product value', value: '$1.24M', change: -2.1, detail: 'vs. last month', tone: 'orange' },
]

export const monthlyPerformance = [
  { month: 'May', revenue: 118, expenses: 72 },
  { month: 'Jun', revenue: 138, expenses: 84 },
  { month: 'Jul', revenue: 115, expenses: 80 },
  { month: 'Aug', revenue: 168, expenses: 91 },
  { month: 'Sep', revenue: 148, expenses: 105 },
  { month: 'Oct', revenue: 192, expenses: 116 },
]

export const recentTransactions: Transaction[] = [
  { id: 'tx-1', label: 'V1 Carbon Edition sale', date: 'Today, 10:42 AM', type: 'income', income: 185000, expense: 0 },
  { id: 'tx-2', label: 'Performance campaign', date: 'Yesterday, 4:18 PM', type: 'expense', income: 0, expense: 12400 },
  { id: 'tx-3', label: 'September payroll', date: 'Oct 15, 2026', type: 'payroll', income: 0, expense: 84200 },
  { id: 'tx-4', label: 'GT package reservation', date: 'Oct 14, 2026', type: 'income', income: 92000, expense: 0 },
  { id: 'tx-5', label: 'Studio production', date: 'Oct 13, 2026', type: 'expense', income: 0, expense: 8600 },
]
