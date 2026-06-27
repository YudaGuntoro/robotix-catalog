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
    <div id="store-location">
      <Section yPadding="py-6">
        <div className="mx-auto max-w-screen-xl px-3 sm:px-6">
          <header className="mb-8 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold text-primary-700 shadow-sm backdrop-blur sm:text-xs">
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5Z" />
              </svg>
              Kunjungi Offline Store
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-primary-600 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent">
                Lokasi Toko Robotix.ID
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl">
              Temukan produk pilihan Robotix.ID secara online dan kunjungi toko
              kami langsung untuk pengalaman belanja yang lebih dekat.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-28 rounded-full bg-gradient-to-r from-primary-600 via-fuchsia-500 to-emerald-500" />
          </header>

          <div className="space-y-5">
            <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
              <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-100/20 via-transparent to-emerald-100/20" />
                <div className="absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-500 text-white shadow-[0_12px_28px_rgba(59,130,246,0.28)]">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5Z" />
                      </svg>
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">
                        Store Locator
                      </p>
                      <p className="mt-1 text-base font-bold tracking-tight text-gray-900">
                        Robotix.ID Offline Store
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Lihat lokasi, buka rute tercepat, atau salin pin untuk
                        dibagikan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[3/4] sm:aspect-[16/9] lg:aspect-auto lg:min-h-full lg:flex-1">
                  <iframe
                    title="Lokasi Robotix.ID"
                    src={embedSrc}
                    className="size-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.92))] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">
                    Panduan Cepat
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                      <p className="text-sm font-bold text-gray-900">
                        1. Cek pin toko
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Gunakan map untuk lihat posisi toko dengan cepat.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                      <p className="text-sm font-bold text-gray-900">
                        2. Buka rute
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Tekan tombol arahkan untuk langsung masuk ke navigasi.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                      <p className="text-sm font-bold text-gray-900">
                        3. Copy koordinat
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Praktis untuk dibagikan ke teman atau dipakai di
                        aplikasi map lain.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Koordinat Lokasi
                  </p>
                  <p className="mt-2 text-lg font-black tracking-tight text-gray-900">
                    {coordinateLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Simpan pin ini kalau Anda ingin cari lokasi secara manual.
                  </p>

                  <button
                    type="button"
                    onClick={handleCopyLocation}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  >
                    {copiedLocation ? 'Koordinat tersalin' : 'Copy pin lokasi'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-between gap-3 overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#0284c7,#2563eb,#14b8a6)] px-4 py-3 text-left text-white shadow-[0_14px_34px_rgba(37,99,235,0.22)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(37,99,235,0.28)] focus:outline-none focus:ring-2 focus:ring-primary-500/40 sm:w-auto sm:min-w-[220px]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />

                <span className="flex items-center gap-3">
                  <span className="bg-white/16 inline-flex size-9 shrink-0 items-center justify-center rounded-2xl ring-1 ring-white/20 backdrop-blur">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2 3 13l7 1 2 8 9-11-7-1-2-8Z" />
                    </svg>
                  </span>

                  <span className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                      Navigation
                    </span>
                    <span className="mt-0.5 text-sm font-bold">
                      Arahkan ke Lokasi
                    </span>
                  </span>
                </span>

                <span className="bg-white/14 inline-flex size-8 items-center justify-center rounded-full transition duration-300 group-hover:translate-x-1">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </a>

              <a
                href={mapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-between gap-3 overflow-hidden rounded-[20px] border border-gray-200/80 bg-white/90 px-4 py-3 text-left text-gray-800 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-white/60 transition duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:bg-white hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)] focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:w-auto sm:min-w-[220px]"
              >
                <span className="from-primary-50/0 via-primary-50/40 pointer-events-none absolute inset-0 bg-gradient-to-r to-emerald-50/0 opacity-0 transition duration-500 group-hover:opacity-100" />

                <span className="flex items-center gap-3">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 via-white to-emerald-50 ring-1 ring-gray-200">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-primary-600"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5Z" />
                    </svg>
                  </span>

                  <span className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Map Access
                    </span>
                    <span className="mt-0.5 text-sm font-bold">
                      Buka di Google Maps
                    </span>
                  </span>
                </span>

                <span className="group-hover:bg-primary-50 inline-flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition duration-300 group-hover:translate-x-1 group-hover:text-primary-600">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export { MapLocation };
