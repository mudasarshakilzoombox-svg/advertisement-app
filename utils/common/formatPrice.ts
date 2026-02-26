export function formatPrice(
  amount: number,
  locale: string = "en-PK"
): string {
  return new Intl.NumberFormat(locale).format(amount);
}