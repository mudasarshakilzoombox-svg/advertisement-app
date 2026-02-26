import type { PriceProps } from "@/types/price";
import { formatPrice } from "@/utils/common/formatPrice";

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