'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const FloatingRobotMascot = () => {
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    if (!isWaving) return undefined;

    const timer = window.setTimeout(() => {
      setIsWaving(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [isWaving]);

  return (
    <button
      type="button"
      onClick={() => setIsWaving(true)}
      aria-label="Robot mascot"
      className="fixed bottom-4 left-4 z-40 flex flex-col items-start sm:bottom-5 sm:left-5"
    >
      <span
        className={[
          'mb-3 rounded-2xl border border-sky-100 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-[0_14px_34px_rgba(15,23,42,0.12)] backdrop-blur transition-all duration-300',
          isWaving
            ? 'translate-y-0 opacity-100'
            : 'translate-y-1 opacity-0 pointer-events-none',
        ].join(' ')}
      >
        Halo, ayo lihat produk
      </span>

      <span
        className={[
          'robot-mascot relative inline-flex size-20 items-center justify-center rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,249,255,0.94))] p-3 shadow-[0_20px_50px_rgba(14,165,233,0.2)] ring-1 ring-sky-100/80 transition duration-300 hover:scale-[1.04]',
          isWaving ? 'robot-mascot-wave' : '',
        ].join(' ')}
      >
        <span className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.28),transparent_58%)]" />
        <Image
          src="/assets/images/robotic.svg"
          alt="Robot mascot"
          width={56}
          height={56}
          className="relative size-auto object-contain"
          priority
        />
      </span>
    </button>
  );
};

export { FloatingRobotMascot };
