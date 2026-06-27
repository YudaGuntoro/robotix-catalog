'use client';

import { useEffect, useState } from 'react';

import { Section } from '../layout/Section';
import { RotatingProductHighlight } from './RotatingProductHighlight';

const admins = [
  { label: 'Admin 1', phone: '6285157742849' },
  { label: 'Admin 2', phone: '62895369665736' },
] as const;

const waMessage = encodeURIComponent(
  'Halo Admin Robotix.ID, saya ingin bertanya tentang produk yang tersedia.',
);

const Hero = () => {
  const [showAdminModal, setShowAdminModal] = useState(false);

  useEffect(() => {
    if (!showAdminModal) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowAdminModal(false);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAdminModal]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-slate-200 bg-[#f7f8fa]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(14,165,233,0.08),transparent_28%)]" />

      <Section yPadding="py-16 sm:py-20 lg:py-24">
        <div className="relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.82fr)] lg:gap-20">
          <header className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-primary-700">
              ROBOTIX.ID
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
              Komponen untuk ide yang ingin{' '}
              <span className="text-primary-600">diwujudkan.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Temukan modul, sensor, dan perangkat robotik untuk belajar,
              bereksperimen, atau membangun proyek berikutnya.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#product-list"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                Lihat Produk
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
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>

              <button
                type="button"
                onClick={() => setShowAdminModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 text-emerald-600"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.205-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.478s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.711.226 1.359.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.569-.347Z" />
                  <path d="M12.004 2.003c-5.514 0-9.98 4.466-9.98 9.98 0 1.762.462 3.483 1.34 5L2 22l5.145-1.307a9.93 9.93 0 0 0 4.859 1.254h.004c5.511 0 9.984-4.466 9.984-9.98 0-2.661-1.036-5.163-2.918-7.045a9.9 9.9 0 0 0-7.07-2.919Zm0 18.274h-.003a8.25 8.25 0 0 1-4.204-1.151l-.301-.179-3.054.776.815-2.976-.196-.305a8.26 8.26 0 0 1-1.274-4.409c0-4.556 3.706-8.262 8.263-8.262 2.202 0 4.272.857 5.829 2.414a8.19 8.19 0 0 1 2.419 5.848c-.002 4.557-3.709 8.244-8.294 8.244Z" />
                </svg>
                Tanya Admin
              </button>

              <a
                href="#store-location"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 21s6-6.2 6-11a6 6 0 1 0-12 0c0 4.8 6 11 6 11Z" />
                  <circle cx="12" cy="10" r="2.2" />
                </svg>
                Cek Lokasi
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-5 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Bantuan pemilihan produk
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Cek stok melalui admin
              </span>
            </div>
          </header>

          <RotatingProductHighlight />
        </div>
      </Section>

      {showAdminModal ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setShowAdminModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="admin-modal-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Pilih Admin
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Hubungi salah satu admin untuk menanyakan produk.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
                aria-label="Tutup pilihan admin"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="mt-5 grid gap-2">
              {admins.map((admin) => (
                <a
                  key={admin.phone}
                  href={`https://wa.me/${admin.phone}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowAdminModal(false)}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex size-8 items-center justify-center rounded-md bg-[#128C4A] text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.205-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.478s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.711.226 1.359.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.569-.347Z" />
                        <path d="M12.004 2.003c-5.514 0-9.98 4.466-9.98 9.98 0 1.762.462 3.483 1.34 5L2 22l5.145-1.307a9.93 9.93 0 0 0 4.859 1.254h.004c5.511 0 9.984-4.466 9.984-9.98 0-2.661-1.036-5.163-2.918-7.045a9.9 9.9 0 0 0-7.07-2.919Zm0 18.274h-.003a8.25 8.25 0 0 1-4.204-1.151l-.301-.179-3.054.776.815-2.976-.196-.305a8.26 8.26 0 0 1-1.274-4.409c0-4.556 3.706-8.262 8.263-8.262 2.202 0 4.272.857 5.829 2.414a8.19 8.19 0 0 1 2.419 5.848c-.002 4.557-3.709 8.244-8.294 8.244Z" />
                      </svg>
                    </span>
                    {admin.label}
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export { Hero };
