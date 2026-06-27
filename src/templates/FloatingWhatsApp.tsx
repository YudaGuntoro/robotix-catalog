'use client';

import { useEffect, useState } from 'react';

const admins = [
  { label: 'Admin 1', phone: '6285157742849' },
  { label: 'Admin 2', phone: '62895369665736' },
] as const;

const waMessage = encodeURIComponent(
  'Hi Robotix.ID, saya ingin bertanya tentang produk yang tersedia.',
);

const FloatingWhatsApp = () => {
  const [showHint, setShowHint] = useState(false);
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHint(window.scrollY > 120);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToHero = () => {
    const heroSection = document.getElementById('hero');

    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end sm:bottom-5 sm:right-5">
      {showAdminOptions ? (
        <div
          id="whatsapp-admin-options"
          className="mb-3 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
        >
          <p className="px-1 pb-2 text-xs font-semibold text-slate-700">
            Hubungi admin
          </p>

          <div className="grid gap-2">
            {admins.map((admin) => (
              <a
                key={admin.phone}
                href={`https://wa.me/${admin.phone}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowAdminOptions(false)}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-md bg-[#128C4A] text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.205-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.478s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.711.226 1.359.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.569-.347Z" />
                    <path d="M12.004 2.003c-5.514 0-9.98 4.466-9.98 9.98 0 1.762.462 3.483 1.34 5L2 22l5.145-1.307a9.93 9.93 0 0 0 4.859 1.254h.004c5.511 0 9.984-4.466 9.984-9.98 0-2.661-1.036-5.163-2.918-7.045a9.9 9.9 0 0 0-7.07-2.919Zm0 18.274h-.003a8.25 8.25 0 0 1-4.204-1.151l-.301-.179-3.054.776.815-2.976-.196-.305a8.26 8.26 0 0 1-1.274-4.409c0-4.556 3.706-8.262 8.263-8.262 2.202 0 4.272.857 5.829 2.414a8.19 8.19 0 0 1 2.419 5.848c-.002 4.557-3.709 8.244-8.294 8.244Z" />
                  </svg>
                </span>

                {admin.label}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <span
          className={[
            'mb-3 rounded-2xl border border-emerald-100 bg-white/95 px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-[0_14px_34px_rgba(15,23,42,0.12)] backdrop-blur transition-all duration-300',
            showHint
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-1 opacity-0',
          ].join(' ')}
        >
          Halo, ayo kontak admin
        </span>
      )}

      <div className="flex items-end gap-3">
        <button
          type="button"
          onClick={handleBackToHero}
          aria-label="Kembali ke Hero"
          className={[
            'inline-flex size-14 items-center justify-center rounded-full border border-sky-100 bg-white/95 text-primary-600 shadow-[0_14px_34px_rgba(15,23,42,0.12)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_18px_40px_rgba(14,165,233,0.18)] focus:outline-none focus:ring-4 focus:ring-primary-500/20',
            showHint
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-1 opacity-0',
          ].join(' ')}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m6 15 6-6 6 6"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setShowAdminOptions((isOpen) => !isOpen)}
          aria-label="Pilih admin WhatsApp Robotix.ID"
          aria-expanded={showAdminOptions}
          aria-controls="whatsapp-admin-options"
          className="floating-wa inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.3)] transition duration-300 hover:scale-105 hover:shadow-[0_18px_40px_rgba(37,211,102,0.36)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.205-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.478s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.711.226 1.359.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.569-.347Z" />
            <path d="M12.004 2.003c-5.514 0-9.98 4.466-9.98 9.98 0 1.762.462 3.483 1.34 5L2 22l5.145-1.307a9.93 9.93 0 0 0 4.859 1.254h.004c5.511 0 9.984-4.466 9.984-9.98 0-2.661-1.036-5.163-2.918-7.045a9.9 9.9 0 0 0-7.07-2.919Zm0 18.274h-.003a8.25 8.25 0 0 1-4.204-1.151l-.301-.179-3.054.776.815-2.976-.196-.305a8.26 8.26 0 0 1-1.274-4.409c0-4.556 3.706-8.262 8.263-8.262 2.202 0 4.272.857 5.829 2.414a8.19 8.19 0 0 1 2.419 5.848c-.002 4.557-3.709 8.244-8.294 8.244Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export { FloatingWhatsApp };
