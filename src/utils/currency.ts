export const formatCurrency = (
  amount: number,
  minDigits?: number,
  maxDigits?: number
) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: minDigits ?? 0,
    maximumFractionDigits: maxDigits ?? 0
  }).format(amount)
}
