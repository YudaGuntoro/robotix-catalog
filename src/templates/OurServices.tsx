'use client';

import { useEffect, useState } from 'react';

import { Section } from '@/layout/Section';

type ApiService = {
  'Service Name': string;
  Description: string;
  Image: string;
  No?: number;
  row_number?: number;
};

type ServiceItem = {
  title: string;
  description: string;
  accent: string;
  image: string;
};

const accentPalette = [
  'bg-amber-50',
  'bg-blue-50',
  'bg-rose-50',
  'bg-emerald-50',
  'bg-violet-50',
] as const;

const OurServices = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFewItems = services.length <= 3;

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await fetch(
          'https://n8n.robotix-id.com/webhook/service-product',
          {
            method: 'GET',
            headers: { Accept: 'application/json' },
            cache: 'no-store',
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: ApiService[] = await response.json();
        const mappedServices = (data || [])
          .map((service, index) => ({
            title: service['Service Name']?.trim(),
            description: service.Description,
            image: service.Image || '/assets/images/robotic.svg',
            accent:
              accentPalette[index % accentPalette.length] ?? 'bg-slate-50',
          }))
          .filter((service) => service.title && service.description);

        if (isMounted) {
          setServices(mappedServices);
        }
      } catch {
        if (isMounted) {
          setServices([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  let content: JSX.Element;

  if (loading) {
    content = (
      <div className="mx-auto mt-14 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="text-center">
            <div className="mx-auto size-[72px] animate-pulse rounded-[24px] bg-slate-100" />
            <div className="mx-auto mt-5 h-7 w-40 animate-pulse rounded-full bg-slate-100" />
            <div className="mx-auto mt-3 h-4 w-full max-w-sm animate-pulse rounded-full bg-slate-100" />
            <div className="mx-auto mt-2 h-4 w-5/6 max-w-xs animate-pulse rounded-full bg-slate-100" />
          </div>
        ))}
      </div>
    );
  } else if (services.length > 0) {
    content = (
      <div
        className={[
          'mx-auto mt-14 grid gap-10',
          hasFewItems ? 'max-w-4xl justify-center' : 'max-w-6xl',
        ].join(' ')}
        style={{
          gridTemplateColumns: hasFewItems
            ? 'repeat(auto-fit, minmax(260px, 320px))'
            : 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        {services.map((service, index) => (
          <article key={`${service.title}-${index}`} className="text-center">
            <div
              className={[
                'mx-auto flex size-[72px] items-center justify-center overflow-hidden rounded-[24px] ring-1 ring-slate-100',
                service.accent,
              ].join(' ')}
            >
              <img
                src={service.image}
                alt={service.title}
                className="size-12 object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            <h3 className="mt-5 text-2xl font-medium tracking-tight text-slate-900">
              {service.title}
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-base leading-8 text-slate-600">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="mx-auto mt-14 max-w-2xl rounded-[28px] border border-slate-200 bg-white/80 px-6 py-10 text-center shadow-sm">
        <p className="text-lg font-bold text-slate-900">
          Layanan belum tersedia
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Data layanan dari n8n belum tersedia saat ini. Silakan cek lagi
          sebentar lagi atau hubungi admin untuk informasi lebih lanjut.
        </p>
      </div>
    );
  }

  return (
    <Section yPadding="py-16 md:py-24">
      <div className="rounded-[36px] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-6 py-12 shadow-[0_18px_60px_rgba(15,23,42,0.06)] sm:px-10 md:px-14 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold text-primary-700 shadow-sm backdrop-blur sm:text-xs">
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="currentColor"
              aria-hidden
            >
              <path d="M7 3a2 2 0 0 0-2 2v2h14V5a2 2 0 0 0-2-2H7Z" />
              <path d="M5 10v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9H5Z" />
            </svg>
            Layanan Self Hosting
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-primary-600 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent">
              Solusi Hosting & Automation Untuk Bisnis Anda
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl">
            Temukan layanan hosting aplikasi, dashboard monitoring, automation,
            dan integrasi workflow yang siap bantu sistem Anda tumbuh lebih
            stabil dan efisien.
          </p>

          <div className="mx-auto mt-5 h-1.5 w-28 rounded-full bg-gradient-to-r from-primary-600 via-fuchsia-500 to-emerald-500" />

          <a
            href="https://wa.me/6285157742849?text=Halo%20Admin%20Robotix.ID,%20saya%20ingin%20tanya%20layanan%20self%20hosting."
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(16,185,129,0.24)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(16,185,129,0.32)]"
          >
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              className="size-5 flex-none text-white"
              fill="currentColor"
            >
              <path d="M19.11 17.27c-.29-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.21-.45-2.31-1.45-.85-.76-1.43-1.7-1.6-1.98-.17-.29-.02-.45.12-.59.12-.12.29-.31.43-.48.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.48-.17 0-.36-.02-.55-.02-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.02 3.08 4.89 4.32 2.87 1.24 2.87.83 3.39.79.52-.05 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.24-.19-.5-.31zM16 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.25.59 4.37 1.62 6.2L3.2 28.8l6.8-1.58c1.78.97 3.82 1.53 5.99 1.53 7.07 0 12.8-5.73 12.8-12.8S23.07 3.2 16 3.2zM16 26.14c-1.99 0-3.84-.6-5.37-1.62l-.38-.25-4.04.94.86-3.94-.26-.4a10.67 10.67 0 0 1-1.66-5.67c0-5.9 4.8-10.7 10.7-10.7s10.7 4.8 10.7 10.7-4.8 10.7-10.7 10.7z" />
            </svg>
            <span className="flex flex-col items-start leading-none">
              <span className="text-sm font-semibold sm:text-base">
                Tanya Admin
              </span>
              <span className="mt-1 text-[11px] font-medium text-white/85">
                Untuk layanan self host
              </span>
            </span>
          </a>
        </div>

        {content}
      </div>
    </Section>
  );
};

export { OurServices };
