"use client";

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
};

export default function CountUp({ value, suffix = "", duration = 1200 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const shouldReduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!inView || shouldReduceMotion) {
      setCount(value);
      return;
    }

    let start = 0;
    const stepTime = Math.max(Math.floor(duration / value), 16);
    const timer = window.setInterval(() => {
      start += Math.ceil(value / (duration / stepTime));
      if (start >= value) {
        setCount(value);
        window.clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => window.clearInterval(timer);
  }, [inView, value, duration, shouldReduceMotion]);

  return (
    <div ref={ref} className="text-4xl font-bold text-[var(--ink)]">
      {count}{suffix}
    </div>
  );
}
