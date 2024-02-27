export const formatCurrency = (amount?: number, currency: string = "EUR", minDigits?: number, maxDigits?: number) => {
  if (amount === null || amount === undefined) return ""

  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
    minimumFractionDigits: minDigits ?? 0,
    maximumFractionDigits: maxDigits ?? 0,
  }).format(amount)
}
