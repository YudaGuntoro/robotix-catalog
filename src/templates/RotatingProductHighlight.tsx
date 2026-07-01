'use client';

import { useEffect, useState } from 'react';

type ApiProduct = {
  ProductName: string;
  Description: string;
  Price?: number;
  Image: string;
};

type ProductHighlight = {
  title: string;
  description: string;
  image: string;
  price?: number;
};

const fallbackProduct: ProductHighlight = {
  title: 'Robotik & STEM',
  description:
    'Perangkat belajar interaktif untuk eksperimen, coding, dan eksplorasi teknologi.',
  image: '/assets/images/robotic.svg',
};

const fallbackProducts: ProductHighlight[] = [
  fallbackProduct,
  {
    title: 'Sensor & Modul',
    description:
      'Komponen penting untuk merakit proyek IoT, otomasi, dan prototype elektronik.',
    image: '/assets/images/robotic.svg',
  },
  {
    title: 'Kit Edukasi',
    description:
      'Paket pembelajaran siap pakai untuk sekolah, kelas workshop, dan belajar mandiri.',
    image: '/assets/images/robotic.svg',
  },
];

const formatIDR = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

const RotatingProductHighlight = () => {
  const [products, setProducts] =
    useState<ProductHighlight[]>(fallbackProducts);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await fetch(
          'https://n8n.robotix-id.com/webhook/get-list-product',
          {
            method: 'GET',
            headers: { Accept: 'application/json' },
            cache: 'no-store',
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: ApiProduct[] = await response.json();
        const mappedProducts = (data || [])
          .map((product) => ({
            title: product.ProductName,
            description: product.Description,
            image: product.Image || '/assets/images/robotic.svg',
            price:
              typeof product.Price === 'number' ? product.Price : undefined,
          }))
          .filter((product) => product.title && product.description)
          .slice(0, 8);

        if (isMounted && mappedProducts.length > 0) {
          setProducts(mappedProducts);
          setActiveIndex(0);
        }
      } catch {
        if (isMounted) {
          setProducts(fallbackProducts);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (products.length <= 1) return undefined;

    const rotationDelay = 3200;
    const fadeDuration = 450;
    let fadeTimeoutId: number | undefined;

    const intervalId = window.setInterval(() => {
      setIsVisible(false);

      fadeTimeoutId = window.setTimeout(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % products.length);
        setIsVisible(true);
      }, fadeDuration);
    }, rotationDelay);

    return () => {
      window.clearInterval(intervalId);

      if (fadeTimeoutId) {
        window.clearTimeout(fadeTimeoutId);
      }
    };
  }, [products]);

  const activeProduct = products[activeIndex] ?? fallbackProduct;

  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-[#173a31]/10 bg-white/90 p-3 shadow-[0_30px_80px_rgba(28,72,60,0.13)] backdrop-blur sm:p-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] border border-black/5 bg-[#e7eee9]">
        <div className="product-card-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-md border border-black/10 bg-[#f4f2ea]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1c2925] shadow-sm backdrop-blur sm:text-[11px]">
          <span className="size-1.5 rounded-full bg-[#ef7548]" />
          Produk pilihan
        </div>

        <div className="absolute bottom-4 right-4 z-10 rounded-md bg-[#0b1513] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
          0{activeIndex + 1} / 0{products.length}
        </div>

        <img
          src={activeProduct.image}
          alt={activeProduct.title}
          className={[
            'relative z-[1] size-full object-contain p-10 transition duration-500 sm:p-12',
            isVisible
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-2 scale-[0.94] opacity-0',
          ].join(' ')}
          loading="eager"
          decoding="async"
          onError={(event) => {
            const image = event.currentTarget;

            image.onerror = null;
            image.src = '/assets/images/robotic.svg';
          }}
        />
      </div>

      <div className="px-2 pb-2 pt-5 sm:px-3">
        <div
          className={[
            'transition duration-500',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          ].join(' ')}
        >
          <div className="flex items-start justify-between gap-5">
            <h2 className="line-clamp-2 text-xl font-bold leading-7 -tracking-wide text-[#10251f] sm:text-2xl">
              {activeProduct.title}
            </h2>

            {typeof activeProduct.price === 'number' ? (
              <p className="shrink-0 rounded-md bg-[#b8e8d8] px-3 py-1.5 text-xs font-bold text-[#10251f]">
                {formatIDR(activeProduct.price)}
              </p>
            ) : null}
          </div>

          <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-[#527067]">
            {activeProduct.description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#173a31]/10 pt-4">
          <a
            href="#product-list"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#10251f] transition hover:text-[#28735f]"
          >
            Jelajahi katalog
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>

          <div className="flex gap-1.5" aria-label="Rotasi produk">
            {products.map((product, index) => (
              <span
                key={`${product.title}-${index}`}
                className={[
                  'h-1.5 rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'w-6 bg-[#ef7548]'
                    : 'w-1.5 bg-[#173a31]/15',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export { RotatingProductHighlight };
