'use client';

import { useEffect, useState } from 'react';

import { Section } from '../layout/Section';

const mapsPlaceUrl =
  'https://www.google.com/maps/place/Robotix.ID/@-6.5183757,107.456591,74m/data=!3m1!1e3!4m14!1m7!3m6!1s0x2e690d0036d1baa5:0x788f5605cdab049c!2sRobotix.ID!8m2!3d-6.5183327!4d107.4567047!16s%2Fg%2F11zk7ngs5v!3m5!1s0x2e690d0036d1baa5:0x788f5605cdab049c!8m2!3d-6.5183327!4d107.4567047!16s%2Fg%2F11zk7ngs5v?entry=ttu';
const lat = -6.5183327;
const lng = 107.4567047;

const embedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=18&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
const coordinateLabel = `${lat}, ${lng}`;

const visitSteps = [
  {
    title: 'Cek posisi toko',
    description: 'Pastikan pin Robotix.ID sudah sesuai dengan titik tujuan.',
  },
  {
    title: 'Pilih rute terbaik',
    description: 'Buka navigasi langsung dari perangkat yang Anda gunakan.',
  },
  {
    title: 'Simpan koordinat',
    description: 'Bagikan pin atau gunakan di aplikasi peta pilihan Anda.',
  },
] as const;

const MapLocation = () => {
  const [copiedLocation, setCopiedLocation] = useState(false);

  useEffect(() => {
    if (!copiedLocation) {
      return () => {};
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedLocation(false);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [copiedLocation]);

  const handleCopyLocation = async () => {
    try {
      await navigator.clipboard.writeText(coordinateLabel);
      setCopiedLocation(true);
    } catch {
      setCopiedLocation(false);
    }
  };

  return (
    <section id="store-location" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-white to-transparent" />

      <Section yPadding="py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[36px] border border-[#173a31]/10 bg-[#f8f3ed] px-4 py-8 shadow-[0_20px_70px_rgba(23,58,49,0.07)] sm:px-8 sm:py-10 md:px-12 md:py-14">
          <div className="pointer-events-none absolute -right-32 -top-40 size-96 rounded-full bg-[#ffd8c7]/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-44 -left-28 size-96 rounded-full bg-[#b8e8d8]/30 blur-3xl" />

          <header className="relative mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#28735f] sm:text-xs">
                <span className="h-px w-8 bg-[#ef7548]" />
                Kunjungi offline store
              </div>

              <h2 className="mt-5 text-4xl font-extrabold leading-[1.04] -tracking-wider text-[#10251f] sm:text-5xl md:text-6xl">
                Datang langsung,{' '}
                <span className="font-serif font-normal italic tracking-[-0.035em] text-[#28735f]">
                  lihat lebih dekat.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-[#527067] sm:text-lg">
              Temukan produk pilihan Robotix.ID secara online dan kunjungi toko
              kami langsung untuk pengalaman belanja yang lebih dekat.
            </p>
          </header>

          <div className="relative grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <div className="flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-[#173a31]/10 bg-white p-3 shadow-[0_20px_60px_rgba(23,58,49,0.08)]">
              <div className="flex flex-col gap-4 px-2 pb-4 pt-2 sm:flex-row sm:items-center sm:justify-between sm:px-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#dff3eb] text-[#28735f]">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5Z" />
                    </svg>
                  </span>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#28735f]">
                      Store locator
                    </p>
                    <p className="mt-1 font-bold text-[#10251f]">
                      Robotix.ID Offline Store
                    </p>
                  </div>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#173a31]/10 bg-[#f5f8f6] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#527067]">
                  <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                  Pin lokasi aktif
                </div>
              </div>

              <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-[20px] border border-[#173a31]/10 bg-[#e8efeb] sm:min-h-[520px]">
                <iframe
                  title="Lokasi Robotix.ID"
                  src={embedSrc}
                  className="absolute inset-0 size-full border-0 grayscale-[0.12]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#10251f]/15 to-transparent" />

                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_14px_38px_rgba(23,58,49,0.13)] backdrop-blur">
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#789087]">
                      Koordinat
                    </p>
                    <p className="mt-1 truncate font-mono text-xs font-bold text-[#10251f] sm:text-sm">
                      {coordinateLabel}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyLocation}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#eef4f0] px-3 py-2 text-xs font-bold text-[#28735f] transition hover:bg-[#dff3eb] focus:outline-none focus:ring-2 focus:ring-[#28735f]/20"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="8" y="8" width="11" height="11" rx="2" />
                      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                    </svg>
                    {copiedLocation ? 'Tersalin' : 'Salin pin'}
                  </button>
                </div>
              </div>
            </div>

            <aside className="flex min-w-0 flex-col gap-4">
              <div className="flex-1 rounded-[28px] border border-[#173a31]/10 bg-white p-5 shadow-[0_18px_50px_rgba(23,58,49,0.06)] sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#28735f]">
                      Sebelum berangkat
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-[#10251f]">
                      Panduan singkat
                    </h3>
                  </div>
                  <span className="font-serif text-4xl italic text-[#ef7548]">
                    03
                  </span>
                </div>

                <div className="mt-7 space-y-0">
                  {visitSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="group relative grid grid-cols-[36px_minmax(0,1fr)] gap-3 pb-6 last:pb-0"
                    >
                      {index < visitSteps.length - 1 ? (
                        <span className="absolute bottom-0 left-[17px] top-9 w-px bg-[#173a31]/10" />
                      ) : null}

                      <span className="relative z-[1] inline-flex size-9 items-center justify-center rounded-full border border-[#173a31]/10 bg-[#f5f8f6] text-[10px] font-bold text-[#28735f] transition group-hover:bg-[#dff3eb]">
                        0{index + 1}
                      </span>

                      <div className="pt-1">
                        <p className="text-sm font-bold text-[#10251f]">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[#607a72]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[#173a31]/10 bg-[#e4f3ed] p-5 text-[#10251f] shadow-[0_20px_50px_rgba(23,58,49,0.09)] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#28735f]">
                      Ready to visit?
                    </p>
                    <p className="mt-2 text-xl font-bold -tracking-wide">
                      Pilih cara menuju toko
                    </p>
                  </div>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#ffd8c7] text-[#d95f34]">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2 3 13l7 1 2 8 9-11-7-1-2-8Z" />
                    </svg>
                  </span>
                </div>

                <div className="mt-5 grid gap-2">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between rounded-xl bg-[#28735f] px-4 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(40,115,95,0.16)] transition hover:-translate-y-0.5 hover:bg-[#205f4f]"
                  >
                    Arahkan ke lokasi
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>

                  <a
                    href={mapsPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between rounded-xl border border-[#173a31]/10 bg-white/80 px-4 py-3.5 text-sm font-bold text-[#10251f] transition hover:-translate-y-0.5 hover:border-[#28735f]/25 hover:bg-white"
                  >
                    Buka di Google Maps
                    <span className="transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </section>
  );
};

export { MapLocation };
