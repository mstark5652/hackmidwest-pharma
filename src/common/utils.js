
const THOUSAND = 1000
const MILL = 1000000

export const round = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export const formatCount = count => {
  if (!count || typeof count !== 'number') return '0'

  if (count < THOUSAND) {
    return `${count}`
  }

  if (count < MILL) {
    return `${round(count / THOUSAND)}K`
  }

  if (count >= MILL) {
    return `${round(count / MILL)}M`
  }

  return '0'
}

export const formatCurrency = val => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'

    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  return formatter.format(+val)
}

export const generateId = (prefix = 'id-') => {
  return prefix + round(Math.random() * 100)
}
