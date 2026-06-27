'use client';

import { useEffect, useState } from 'react';

type ApiService = {
  ServiceName: string;
  Description: string;
  Image: string;
};

type ServiceHighlight = {
  title: string;
  description: string;
  image: string;
};

const fallbackService: ServiceHighlight = {
  title: 'Self Hosting Service',
  description:
    'Layanan deployment dan pengelolaan tools automation, monitoring, dan integrasi sesuai kebutuhan workflow Anda.',
  image: '/assets/images/robotic.svg',
};

const fallbackServices: ServiceHighlight[] = [
  fallbackService,
  {
    title: 'Grafana',
    description: 'Monitoring dan dashboard data untuk observabilitas sistem.',
    image: '/assets/images/robotic.svg',
  },
  {
    title: 'n8n',
    description: 'Automation workflow aplikasi untuk integrasi proses bisnis.',
    image: '/assets/images/robotic.svg',
  },
];

const RotatingServiceHighlight = () => {
  const [services, setServices] =
    useState<ServiceHighlight[]>(fallbackServices);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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
          .map((service) => ({
            title: service.ServiceName,
            description: service.Description,
            image: service.Image || '/assets/images/robotic.svg',
          }))
          .filter((service) => service.title && service.description)
          .slice(0, 8);

        if (isMounted && mappedServices.length > 0) {
          setServices(mappedServices);
          setActiveIndex(0);
        }
      } catch {
        if (isMounted) {
          setServices(fallbackServices);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (services.length <= 1) return undefined;

    const rotationDelay = 3200;
    const fadeDuration = 450;
    let fadeTimeoutId: number | undefined;

    const intervalId = window.setInterval(() => {
      setIsVisible(false);

      fadeTimeoutId = window.setTimeout(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % services.length);
        setIsVisible(true);
      }, fadeDuration);
    }, rotationDelay);

    return () => {
      window.clearInterval(intervalId);

      if (fadeTimeoutId) {
        window.clearTimeout(fadeTimeoutId);
      }
    };
  }, [services]);

  const activeService = services[activeIndex] ?? fallbackService;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            Siap bantu kebutuhan Anda
          </p>
          <p
            className={[
              'mt-2 min-h-[4.5rem] text-3xl font-black tracking-tight text-slate-900 transition-all duration-500',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0',
            ].join(' ')}
          >
            {activeService.title}
          </p>
        </div>

        <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Service
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[140px_minmax(0,1fr)] md:items-stretch">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-slate-950/5" />
          <img
            src={activeService.image}
            alt={activeService.title}
            className={[
              'size-full object-fill transition-all duration-500',
              isVisible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0',
            ].join(' ')}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
            Deskripsi layanan
          </p>

          <p
            className={[
              'mt-2 min-h-[4.5rem] text-sm leading-6 text-slate-600 transition-all duration-500 sm:text-base',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0',
            ].join(' ')}
          >
            {activeService.description}
          </p>

          <a
            href={`https://wa.me/6285157742849?text=${encodeURIComponent(
              `Halo Admin Robotix.ID, saya tertarik dengan layanan ${activeService.title}. Bisa minta info lebih lanjut?`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-primary-500 to-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-[0_14px_32px_rgba(37,99,235,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(37,99,235,0.3)]"
          >
            Tanya layanan ini
          </a>
        </div>
      </div>
    </div>
  );
};

export { RotatingServiceHighlight };
