import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const styles =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 bg-purple-900 hover:bg-purple-800 hover:scale-105 text-white " +
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