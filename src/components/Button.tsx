import Link from "next/link";
import type { ButtonProps } from "@/src/types/button";

export default function Button(props: ButtonProps) {
  const { children, className = "" } = props;

  const styles =
    "inline-block px-8 py-4 text-lg font-semibold text-white bg-black/40 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:bg-black/60 hover:scale-105 " +
    className;

  if (props.href !== undefined) {
    const { href, ...rest } = props;

    return (
      <Link href={href} className={styles} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props;

  return (
    <button type={type} className={styles} {...rest}>
      {children}
    </button>
  );
}