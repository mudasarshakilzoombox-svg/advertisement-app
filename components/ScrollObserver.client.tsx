"use client";

import { useEffect, useRef } from "react";

type Props = {
  onVisible: () => void;
};

export default function ScrollObserver({ onVisible }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible();
      },
      { rootMargin: "200px" }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [onVisible]);

  return <div ref={ref} />;
}