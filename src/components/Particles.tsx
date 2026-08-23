import { useEffect, useMemo, useState } from "react";

type Props = { count?: number; className?: string };

export function Particles({ count = 28, className = "" }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 4,
        delay: Math.random() * 14,
        duration: 11 + Math.random() * 12,
        drift: `${Math.round((Math.random() - 0.5) * 160)}px`,
        opacity: 0.35 + Math.random() * 0.55,
      })),
    [count],
  );

  if (!mounted) return null;


  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute bottom-0 rounded-full bg-gold-bright animate-float-up"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            boxShadow: "0 0 10px currentColor",
            color: "var(--gold-bright)",
            // @ts-expect-error custom property
            "--drift": d.drift,
          }}
        />
      ))}
    </div>
  );
}
