import type { PriceProps } from "@/types/price";

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-PK").format(amount);
}

export default function Price({
  amount,
  currency = "Rs",
  className = "",
}: PriceProps) {
  return (
    <p className={`text-lg font-bold text-indigo-600 ${className}`}>
      {currency} {formatPrice(amount)}
    </p>
  );
}