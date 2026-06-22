"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

type Props = {
  src?: string;
  className?: string;
};

export default function LottieBanner({ src = "https://assets4.lottiefiles.com/packages/lf20_touohxv0.json", className = "w-full h-64 md:h-96" }: Props) {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        // ignore
      }
    })();
    return () => { cancelled = true; };
  }, [src]);

  return (
    <div className={className}>
      {data ? (
        <Lottie animationData={data} loop autoplay style={{ width: '100%', height: '100%' }} />
      ) : (
        <div className="w-full h-full bg-[var(--panel)] rounded-lg" />
      )}
    </div>
  );
}
