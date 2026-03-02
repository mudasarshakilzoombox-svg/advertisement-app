import Link from "next/link";
import type { ButtonProps } from "@/src/types/button";

export default function Button({
  children,
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const styles =
    "inline-block px-8 py-4 text-lg font-semibold text-white bg-black/40 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:bg-black/60 hover:scale-105 " +
    className;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}