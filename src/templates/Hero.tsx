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
      className="relative overflow-hidden border-b border-[#173a31]/10 bg-[#f3f7f3]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(112,207,174,0.22),transparent_31%),radial-gradient(circle_at_8%_85%,rgba(239,117,72,0.1),transparent_28%)]" />
      <div className="pointer-events-none absolute -right-40 top-32 h-[540px] w-[620px] rotate-6 rounded-[120px] border border-[#28735f]/10" />
      <div className="pointer-events-none absolute -left-40 top-48 size-80 rounded-full border border-[#ef7548]/15" />

      <Section yPadding="pb-16 pt-5 sm:pb-20 sm:pt-6 lg:pb-24">
        <div className="relative">
          <nav className="flex items-center justify-between border-b border-[#173a31]/10 pb-5">
            <a
              href="#hero"
              className="group inline-flex items-center"
              aria-label="Robotix.ID, kembali ke atas"
            >
              <img
                src="/assets/images/robotic.svg"
                alt="Robotix.ID — Create Your Own Robot With Us"
                className="h-auto w-[158px] transition-transform duration-300 group-hover:scale-[1.02] sm:w-[180px]"
              />
            </a>

            <div className="hidden items-center gap-8 text-sm font-medium text-[#173a31]/60 sm:flex">
              <a
                href="#product-list"
                className="transition hover:text-[#10251f]"
              >
                Produk
              </a>
              <a
                href="#hosting-services"
                className="transition hover:text-[#10251f]"
              >
                Hosting
              </a>
              <a
                href="#store-location"
                className="transition hover:text-[#10251f]"
              >
                Lokasi
              </a>
              <button
                type="button"
                onClick={() => setShowAdminModal(true)}
                className="rounded-lg border border-[#173a31]/15 bg-white/75 px-4 py-2.5 font-semibold text-[#10251f] shadow-sm transition hover:-translate-y-0.5 hover:border-[#28735f]/40 hover:bg-white"
              >
                Tanya Admin
              </button>
            </div>
          </nav>

          <div className="grid grid-cols-1 items-center gap-14 pb-4 pt-14 sm:pt-16 lg:min-h-[680px] lg:grid-cols-[minmax(0,0.92fr)_minmax(430px,1.08fr)] lg:gap-16 lg:pt-14">
            <header className="min-w-0 max-w-3xl">
              <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#28735f] sm:text-xs">
                <span className="h-px w-8 bg-[#ef7548]" />
                Komponen robotik & elektronik
              </div>

              <h1 className="mt-7 max-w-[690px] text-[2.65rem] font-extrabold leading-[1.02] tracking-[-0.055em] text-[#10251f] min-[380px]:text-[2.9rem] sm:text-6xl lg:text-[4.2rem]">
                Temukan komponennya,{' '}
                <span className="font-serif font-normal italic tracking-[-0.035em] text-[#28735f]">
                  lalu hidupkan idemu.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-[#34554c] sm:text-lg sm:leading-8">
                Modul, sensor, dan perangkat robotik untuk eksperimen hari ini
                atau proyek besar berikutnya. Pilih lebih yakin dengan bantuan
                admin yang siap diajak diskusi.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#product-list"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#28735f] px-6 py-4 text-sm font-bold text-white shadow-[0_14px_32px_rgba(40,115,95,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#205f4f] focus:outline-none focus:ring-2 focus:ring-[#28735f] focus:ring-offset-2 focus:ring-offset-[#f3f7f3]"
                >
                  Lihat katalog produk
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
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
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowAdminModal(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#173a31]/15 bg-white/75 px-6 py-4 text-sm font-bold text-[#10251f] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#ef7548]/50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#ef7548] focus:ring-offset-2 focus:ring-offset-[#f3f7f3]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 text-[#ef7548]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.205-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.478s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.711.226 1.359.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.569-.347Z" />
                    <path d="M12.004 2.003c-5.514 0-9.98 4.466-9.98 9.98 0 1.762.462 3.483 1.34 5L2 22l5.145-1.307a9.93 9.93 0 0 0 4.859 1.254h.004c5.511 0 9.984-4.466 9.984-9.98 0-2.661-1.036-5.163-2.918-7.045a9.9 9.9 0 0 0-7.07-2.919Zm0 18.274h-.003a8.25 8.25 0 0 1-4.204-1.151l-.301-.179-3.054.776.815-2.976-.196-.305a8.26 8.26 0 0 1-1.274-4.409c0-4.556 3.706-8.262 8.263-8.262 2.202 0 4.272.857 5.829 2.414a8.19 8.19 0 0 1 2.419 5.848c-.002 4.557-3.709 8.244-8.294 8.244Z" />
                  </svg>
                  Diskusi dengan admin
                </button>
              </div>

              <div className="mt-9 grid max-w-xl gap-3 border-t border-[#173a31]/10 pt-5 text-xs text-[#34554c] sm:grid-cols-3 sm:text-[13px]">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#ef7548]">✓</span>
                  <p>Pilihan produk lebih terarah</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#ef7548]">✓</span>
                  <p>Cek stok langsung ke admin</p>
                </div>
                <a
                  href="#store-location"
                  className="group flex items-start gap-2 transition hover:text-[#10251f]"
                >
                  <span className="mt-0.5 text-[#ef7548]">✓</span>
                  <p>Tersedia toko offline</p>
                </a>
              </div>
            </header>

            <div className="relative mx-auto w-full min-w-0 max-w-[620px] lg:mx-0">
              <div className="pointer-events-none absolute -inset-5 rotate-3 rounded-[2.5rem] border border-[#28735f]/10" />
              <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#ef7548]/15 blur-3xl" />
              <div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#173a31]/45 sm:text-xs">
                <span>Produk pilihan Robotix.ID</span>
                <span className="text-[#28735f]">Explore / 01</span>
              </div>
              <RotatingProductHighlight />
            </div>
          </div>
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
