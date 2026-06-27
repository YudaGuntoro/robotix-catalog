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
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
        <div className="absolute left-4 top-4 z-10 rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
          Produk pilihan
        </div>

        <img
          src={activeProduct.image}
          alt={activeProduct.title}
          className={[
            'size-full object-contain p-8 transition duration-500',
            isVisible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0',
          ].join(' ')}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="px-2 pb-2 pt-5">
        <div
          className={[
            'transition duration-500',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
          ].join(' ')}
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="line-clamp-2 text-xl font-semibold leading-7 text-slate-900">
              {activeProduct.title}
            </h2>

            {typeof activeProduct.price === 'number' ? (
              <p className="shrink-0 text-sm font-semibold text-primary-700">
                {formatIDR(activeProduct.price)}
              </p>
            ) : null}
          </div>

          <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
            {activeProduct.description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <a
            href="#product-list"
            className="text-sm font-semibold text-slate-700 transition hover:text-primary-700"
          >
            Lihat di katalog
          </a>

          <div className="flex gap-1.5" aria-label="Rotasi produk">
            {products.map((product, index) => (
              <span
                key={`${product.title}-${index}`}
                className={[
                  'h-1.5 rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'w-5 bg-slate-800'
                    : 'w-1.5 bg-slate-300',
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
