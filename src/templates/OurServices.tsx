'use client';

import { useEffect, useState } from 'react';

import { Section } from '@/layout/Section';

type ApiService = {
  'Service Name'?: string;
  ServiceName?: string;
  Description?: string;
  Image?: string;
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
  'bg-[#dff3eb]',
  'bg-[#fff0e8]',
  'bg-[#e8eef8]',
  'bg-[#f3eadf]',
  'bg-[#e9e5f5]',
] as const;

const whatsappNumber = '6285157742849';

const OurServices = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

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
            title:
              service['Service Name']?.trim() ||
              service.ServiceName?.trim() ||
              '',
            description: service.Description?.trim() || '',
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
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[28px] border border-[#173a31]/10 bg-white p-3"
          >
            <div className="aspect-[16/10] animate-pulse rounded-[20px] bg-[#e6eee9]" />
            <div className="px-2 pb-4 pt-5">
              <div className="h-7 w-2/3 animate-pulse rounded-full bg-[#dfe8e3]" />
              <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-[#edf2ef]" />
              <div className="mt-2 h-4 w-4/5 animate-pulse rounded-full bg-[#edf2ef]" />
            </div>
          </div>
        ))}
      </div>
    );
  } else if (services.length > 0) {
    content = (
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const message = encodeURIComponent(
            `Halo Admin Robotix.ID, saya tertarik dengan layanan ${service.title}. Bisa minta info lebih lanjut?`,
          );

          return (
            <article
              key={`${service.title}-${index}`}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-[#173a31]/10 bg-white p-3 shadow-[0_18px_50px_rgba(23,58,49,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(23,58,49,0.1)]"
            >
              <div
                className={[
                  'relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px]',
                  service.accent,
                ].join(' ')}
              >
                <div className="service-card-grid pointer-events-none absolute inset-0 opacity-50" />

                <span className="absolute left-4 top-4 rounded-full border border-[#173a31]/10 bg-white/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#34554c] backdrop-blur">
                  0{index + 1}
                </span>

                <span className="absolute right-4 top-4 size-2 rounded-full bg-[#ef7548] shadow-[0_0_0_5px_rgba(239,117,72,0.13)]" />

                <img
                  src={service.image}
                  alt={service.title}
                  className="relative z-[1] size-28 object-contain transition duration-500 group-hover:scale-105 sm:size-32"
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    const image = event.currentTarget;

                    image.onerror = null;
                    image.src = '/assets/images/robotic.svg';
                  }}
                />
              </div>

              <div className="flex flex-1 flex-col px-2 pb-3 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#28735f]">
                  Managed service
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-[#10251f]">
                  {service.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#527067]">
                  {service.description}
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-between border-t border-[#173a31]/10 pt-4 text-sm font-bold text-[#10251f] transition group-hover:text-[#28735f]"
                >
                  Tanya layanan
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#f0f5f2] transition duration-300 group-hover:translate-x-1 group-hover:bg-[#dff3eb]">
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
              </div>
            </article>
          );
        })}
      </div>
    );
  } else {
    content = (
      <div className="mt-10 rounded-[28px] border border-dashed border-[#173a31]/20 bg-white/65 px-6 py-12 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#dff3eb] text-[#28735f]">
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 7h16M7 3v4m10-4v4M6 11h12v9H6z" />
          </svg>
        </div>
        <p className="mt-4 text-lg font-bold text-[#10251f]">
          Layanan sedang diperbarui
        </p>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-[#527067]">
          Hubungi admin untuk mendiskusikan kebutuhan hosting dan automation
          Anda.
        </p>
      </div>
    );
  }

  return (
    <section id="hosting-services" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-[#f3f7f3] to-transparent" />

      <Section yPadding="py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[36px] border border-[#173a31]/10 bg-[#fbfaf6] px-5 py-8 shadow-[0_20px_70px_rgba(23,58,49,0.07)] sm:px-8 sm:py-10 md:px-12 md:py-14">
          <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-[#b8e8d8]/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-24 size-80 rounded-full bg-[#ffd8c7]/30 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#28735f] sm:text-xs">
                <span className="h-px w-8 bg-[#ef7548]" />
                Solusi hosting
              </div>

              <h2 className="mt-5 text-4xl font-extrabold leading-[1.04] -tracking-wider text-[#10251f] sm:text-5xl md:text-6xl">
                Sistem lebih rapi,{' '}
                <span className="font-serif font-normal italic tracking-[-0.035em] text-[#28735f]">
                  kerja jadi lebih ringan.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#527067] sm:text-lg">
                Hosting aplikasi, monitoring, dan workflow automation yang
                disiapkan sesuai kebutuhan—tanpa bikin tim Anda sibuk mengurus
                hal teknis setiap hari.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#173a31]/10 bg-white/80 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#34554c]">
                  Siap diskusi
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#527067]">
                Ceritakan kebutuhan sistem Anda. Kami bantu pilih setup yang
                masuk akal untuk mulai.
              </p>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  'Halo Admin Robotix.ID, saya ingin berdiskusi tentang layanan hosting dan automation.',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex w-full items-center justify-between rounded-xl bg-[#28735f] px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(40,115,95,0.18)] transition hover:-translate-y-0.5 hover:bg-[#205f4f]"
              >
                Diskusi kebutuhan
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative mt-10 flex flex-wrap gap-2 border-y border-[#173a31]/10 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#527067] sm:gap-3 sm:text-xs">
            {['Self hosting', 'Monitoring', 'Automation', 'Integration'].map(
              (label) => (
                <span
                  key={label}
                  className="rounded-full border border-[#173a31]/10 bg-white/70 px-3 py-2"
                >
                  {label}
                </span>
              ),
            )}
          </div>

          <div className="relative">{content}</div>
        </div>
      </Section>
    </section>
  );
};

export { OurServices };
