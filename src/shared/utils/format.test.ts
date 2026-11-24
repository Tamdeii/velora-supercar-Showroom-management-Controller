import { describe, expect, it } from 'vitest'
import { formatCurrency, getInitials, sumBy } from './format'

describe('format utilities', () => {
  it('formats a USD amount without decimal noise', () => expect(formatCurrency(842940)).toBe('$842,940'))
  it('creates initials from the first two words', () => expect(getInitials('Alex Morgan HongT')).toBe('AM'))
  it('sums values selected from a collection', () => expect(sumBy([{ value: 2 }, { value: 7 }], (item) => item.value)).toBe(9))
})
