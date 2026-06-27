'use client';

import Image, { type ImageLoaderProps } from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Section } from '../layout/Section';

type ApiProduct = {
  ProductName: string;
  Description: string;
  Price: number;
  Image: string;
  Stock?: number;
  Available?: number;
  PreOrder?: number;
  New?: number;
  Restock?: number;
};

type BadgeTone = 'new' | 'preorder' | 'restock';

type ProductBadge = {
  label: string;
  tone: BadgeTone;
};

type Card = {
  title: string;
  slug: string;
  desc: string;
  image: string;
  price?: number;
  badge?: ProductBadge | null;
};

type CartItem = {
  product: Card;
  quantity: number;
};

const formatIDR = (v: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(v);

const passthroughImageLoader = ({ src }: ImageLoaderProps) => src;

const waPhone = '6285157742849';
const waAdmins = [
  { label: 'Admin 1', phone: waPhone },
  { label: 'Admin 2', phone: '62895369665736' },
] as const;
const productQueryParam = 'product';

const createProductSlug = (value: string) => {
  const slug = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'produk';
};

const getUrlPath = (url: URL) => `${url.pathname}${url.search}${url.hash}`;

const getProductShareUrl = (slug: string) => {
  if (typeof window === 'undefined') {
    return `?${productQueryParam}=${encodeURIComponent(slug)}`;
  }

  const url = new URL(window.location.href);
  url.searchParams.set(productQueryParam, slug);
  url.hash = '';

  return url.toString();
};

const copyTextToClipboard = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();

  const isCopied = document.execCommand('copy');
  textarea.remove();

  if (!isCopied) {
    throw new Error('Copy failed');
  }
};

const getProductBadge = (p: ApiProduct): ProductBadge | null => {
  const isRestock =
    p.Restock === 1 ||
    p.Available === 0 ||
    (typeof p.Stock === 'number' && p.Stock <= 0);

  if (isRestock) {
    return { label: 'On Restock', tone: 'restock' };
  }

  if (p.PreOrder === 1) {
    return { label: 'Pre-Order', tone: 'preorder' };
  }

  if (p.New === 1) {
    return { label: 'New', tone: 'new' };
  }

  return null;
};

const badgeToneStyles: Record<BadgeTone, string> = {
  new: 'border-sky-200/80 bg-[linear-gradient(135deg,#dbeafe,#bfdbfe,#c7d2fe)] text-sky-900 shadow-[0_10px_24px_rgba(96,165,250,0.16)]',
  preorder:
    'border-emerald-200/80 bg-[linear-gradient(135deg,#dcfce7,#bbf7d0,#ccfbf1)] text-emerald-900 shadow-[0_10px_24px_rgba(52,211,153,0.16)]',
  restock:
    'border-rose-200/80 bg-[linear-gradient(135deg,#ffe4e6,#fecdd3,#ffedd5)] text-rose-900 shadow-[0_10px_24px_rgba(251,113,133,0.18)]',
};
const badgeDotStyles: Record<BadgeTone, string> = {
  new: 'bg-sky-500 shadow-[0_0_14px_rgba(14,165,233,0.35)]',
  preorder: 'bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.35)]',
  restock: 'bg-rose-500 shadow-[0_0_14px_rgba(244,63,94,0.35)]',
};
const badgeMobileLabels: Record<BadgeTone, string> = {
  new: 'New',
  preorder: 'Pre-Order',
  restock: 'On Restock',
};

const StatusBadge = ({
  badge,
  size = 'sm',
  placement = 'inline',
}: {
  badge: ProductBadge;
  size?: 'sm' | 'md';
  placement?: 'inline' | 'overlay';
}) => {
  const isMd = size === 'md';
  const isOverlay = placement === 'overlay';

  return (
    <div
      className={[
        'group/badge relative isolate items-center gap-2 overflow-hidden rounded-full border backdrop-blur-xl',
        isOverlay
          ? 'pointer-events-none absolute left-3 top-3 z-20 inline-flex sm:left-4 sm:top-4'
          : 'inline-flex whitespace-nowrap',
        'ring-1 ring-white/50',
        'before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0.12)_40%,transparent_72%)]',
        'after:pointer-events-none after:absolute after:inset-[1px] after:rounded-full after:border after:border-white/30',
        'transition duration-300',
        isMd
          ? 'px-3.5 py-2 shadow-[0_22px_50px_rgba(15,23,42,0.2)]'
          : 'px-2.5 py-1 shadow-[0_16px_36px_rgba(15,23,42,0.16)]',
        badgeToneStyles[badge.tone],
      ].join(' ')}
    >
      <span className="relative flex shrink-0">
        <span
          className={[
            'absolute inline-flex animate-ping rounded-full opacity-75',
            isMd ? 'h-3 w-3' : 'h-2.5 w-2.5',
            badgeDotStyles[badge.tone],
          ].join(' ')}
        />
        <span
          className={[
            'relative inline-flex rounded-full',
            isMd ? 'h-3 w-3' : 'h-2.5 w-2.5',
            badgeDotStyles[badge.tone],
          ].join(' ')}
        />
      </span>

      <span
        className={[
          'relative font-black uppercase',
          isMd
            ? 'text-[10px] tracking-[0.16em]'
            : 'text-[9px] tracking-[0.08em] sm:text-[8.5px] sm:tracking-[0.14em]',
        ].join(' ')}
      >
        {isMd ? (
          badge.label
        ) : (
          <>
            <span className="sm:hidden">{badgeMobileLabels[badge.tone]}</span>
            <span className="hidden sm:inline">{badge.label}</span>
          </>
        )}
      </span>
    </div>
  );
};

const ProductList = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [copiedProductUrl, setCopiedProductUrl] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showQris, setShowQris] = useState(false);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const openProductDetail = useCallback((card: Card) => {
    setSelectedCard(card);
    setCopiedProductUrl(false);
    setSelectedQuantity(1);

    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const currentProduct = url.searchParams.get(productQueryParam);
    url.searchParams.set(productQueryParam, card.slug);

    const nextUrl = getUrlPath(url);

    if (currentProduct === card.slug) {
      window.history.replaceState({}, '', nextUrl);
      return;
    }

    window.history.pushState({}, '', nextUrl);
  }, []);

  const closeProductDetail = useCallback(() => {
    setSelectedCard(null);
    setCopiedProductUrl(false);
    setSelectedQuantity(1);

    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);

    if (!url.searchParams.has(productQueryParam)) return;

    url.searchParams.delete(productQueryParam);
    window.history.replaceState({}, '', getUrlPath(url));
  }, []);

  const handleShareProduct = useCallback(async () => {
    if (!selectedCard) return;

    const productUrl = getProductShareUrl(selectedCard.slug);
    const shareData = {
      title: selectedCard.title,
      text: `Lihat produk ${selectedCard.title} di Robotix.ID`,
      url: productUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await copyTextToClipboard(productUrl);
      setCopiedProductUrl(true);
      window.setTimeout(() => setCopiedProductUrl(false), 2200);
    } catch (shareError: any) {
      if (shareError?.name === 'AbortError') return;

      await copyTextToClipboard(productUrl);
      setCopiedProductUrl(true);
      window.setTimeout(() => setCopiedProductUrl(false), 2200);
    }
  }, [selectedCard]);

  const addSelectedProductToCart = useCallback(() => {
    if (!selectedCard || typeof selectedCard.price !== 'number') return;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.slug === selectedCard.slug,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.slug === selectedCard.slug
            ? {
                ...item,
                quantity: Math.min(item.quantity + selectedQuantity, 99),
              }
            : item,
        );
      }

      return [
        ...currentItems,
        { product: selectedCard, quantity: selectedQuantity },
      ];
    });

    closeProductDetail();
    setShowCart(true);
  }, [closeProductDetail, selectedCard, selectedQuantity]);

  const updateCartQuantity = useCallback((slug: string, quantity: number) => {
    const safeQuantity = Math.min(Math.max(quantity, 1), 99);

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.slug === slug ? { ...item, quantity: safeQuantity } : item,
      ),
    );
  }, []);

  const removeCartItem = useCallback((slug: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.slug !== slug),
    );
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          'https://n8n.robotix-id.com/webhook/get-list-product',
          {
            method: 'GET',
            headers: { Accept: 'application/json' },
            cache: 'no-store',
          },
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: ApiProduct[] = await res.json();
        const slugCounts = new Map<string, number>();

        const mapped: Card[] = (data || []).map((p) => {
          const baseSlug = createProductSlug(p.ProductName);
          const slugCount = (slugCounts.get(baseSlug) ?? 0) + 1;
          slugCounts.set(baseSlug, slugCount);

          return {
            title: p.ProductName,
            slug: slugCount > 1 ? `${baseSlug}-${slugCount}` : baseSlug,
            desc: p.Description,
            image: p.Image || '/assets/images/robotic.svg',
            price: typeof p.Price === 'number' ? p.Price : undefined,
            badge: getProductBadge(p),
          };
        });

        setCards(mapped);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load products');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (cards.length === 0 || typeof window === 'undefined') {
      return () => {};
    }

    const syncSelectedProductFromUrl = () => {
      const productParam = new URLSearchParams(window.location.search).get(
        productQueryParam,
      );

      if (!productParam) {
        setSelectedCard(null);
        setCopiedProductUrl(false);
        return;
      }

      const normalizedParam = productParam.trim().toLowerCase();
      const productSlug = createProductSlug(productParam);
      const matchedCard = cards.find(
        (card) =>
          card.slug === normalizedParam ||
          card.slug === productSlug ||
          card.title.trim().toLowerCase() === normalizedParam,
      );

      if (!matchedCard) {
        setSelectedCard(null);
        setCopiedProductUrl(false);
        return;
      }

      document
        .getElementById('product-list')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSelectedCard(matchedCard);
      setCopiedProductUrl(false);
    };

    syncSelectedProductFromUrl();
    window.addEventListener('popstate', syncSelectedProductFromUrl);

    return () => {
      window.removeEventListener('popstate', syncSelectedProductFromUrl);
    };
  }, [cards]);

  useEffect(() => {
    if (!selectedCard) {
      return () => {};
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProductDetail();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeProductDetail, selectedCard]);

  useEffect(() => {
    if (!showCart) {
      return () => {};
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      if (showQris) {
        setShowQris(false);
        return;
      }

      setShowCart(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [showCart, showQris]);

  const filteredAndSortedCards = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const filtered = cards.filter((c) => {
      if (!keyword) return true;

      return (
        c.title.toLowerCase().includes(keyword) ||
        c.desc.toLowerCase().includes(keyword)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return (a.price ?? 0) - (b.price ?? 0);
      if (sort === 'price-desc') return (b.price ?? 0) - (a.price ?? 0);
      if (sort === 'name-asc') return a.title.localeCompare(b.title);
      if (sort === 'name-desc') return b.title.localeCompare(a.title);
      return 0;
    });

    return sorted;
  }, [cards, search, sort]);

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + (item.product.price ?? 0) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const cartMessage = useMemo(() => {
    const orderLines = cartItems.map(
      (item, index) =>
        `${index + 1}. ${item.product.title}\n   ${
          item.quantity
        } × ${formatIDR(item.product.price ?? 0)} = ${formatIDR(
          (item.product.price ?? 0) * item.quantity,
        )}`,
    );

    return [
      'Hi Robotix.ID, saya ingin memesan:',
      '',
      ...orderLines,
      '',
      `Total sementara: ${formatIDR(cartTotal)}`,
      '',
      'Mohon konfirmasi ketersediaan stok dan total akhirnya. Terima kasih.',
    ].join('\n');
  }, [cartItems, cartTotal]);

  let content: JSX.Element;

  if (loading) {
    content = (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur"
          >
            <div className="aspect-[4/3] w-full animate-pulse bg-gray-200" />
            <div className="p-4">
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-gray-200" />
              <div className="mt-3 h-5 w-5/6 animate-pulse rounded-full bg-gray-200" />
              <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-gray-200" />
              <div className="mt-2 h-3 w-4/5 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  } else if (error) {
    content = (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
        Gagal memuat produk: {error}
      </div>
    );
  } else if (filteredAndSortedCards.length === 0) {
    content = (
      <div className="rounded-[28px] border border-gray-200 bg-white/90 px-6 py-12 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gray-100">
          <svg
            viewBox="0 0 24 24"
            className="size-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900">
          Produk tidak ditemukan
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
          Coba gunakan kata kunci lain atau ubah urutan pencarian untuk melihat
          produk yang tersedia.
        </p>
      </div>
    );
  } else {
    content = (
      <div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
        role="list"
        aria-label="Daftar produk"
      >
        {filteredAndSortedCards.map((c) => (
          <button
            key={c.title}
            type="button"
            onClick={() => openProductDetail(c)}
            className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/90 text-left shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.14)] focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            title={`Lihat detail ${c.title}`}
          >
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary-100/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              {c.badge ? (
                <StatusBadge badge={c.badge} size="sm" placement="overlay" />
              ) : null}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-slate-950/5 opacity-90" />

              <Image
                loader={passthroughImageLoader}
                unoptimized
                src={c.image}
                alt={c.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 20vw"
                className="object-cover transition duration-500 group-hover:scale-[1.06]"
              />
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="text-sm font-semibold tracking-tight text-primary-600 sm:text-[15px]">
                {typeof c.price === 'number'
                  ? formatIDR(c.price)
                  : 'Harga belum tersedia'}
              </p>

              <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug tracking-tight text-gray-900 sm:text-base">
                {c.title}
              </h3>

              <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-500 sm:text-sm">
                {c.desc}
              </p>

              <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-gray-400 sm:text-xs">
                <span className="inline-block size-2 rounded-full bg-emerald-400" />
                Klik untuk lihat detail
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  const selectedProductUrl = selectedCard
    ? getProductShareUrl(selectedCard.slug)
    : '#';

  const selectedWaUrl = selectedCard
    ? `https://wa.me/${waPhone}?text=${encodeURIComponent(
        `Hi Robotix.ID, saya ingin tanya tentang ${selectedCard.title}${
          typeof selectedCard.price === 'number'
            ? ` dengan harga ${formatIDR(selectedCard.price)}`
            : ''
        }\nLink produk: ${selectedProductUrl}`,
      )}`
    : '#';

  return (
    <div>
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
                <path d="M4 6.75h16M4 12h16M4 17.25h10" />
              </svg>
              Katalog Produk
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-primary-600 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent">
                Temukan Produk Yang Anda Butuhkan
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl">
              Cari komponen, modul, dan perangkat pilihan Robotix.ID dengan
              filter yang lebih cepat untuk bantu kebutuhan proyek dan
              pembelajaran Anda.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-28 rounded-full bg-gradient-to-r from-primary-600 via-fuchsia-500 to-emerald-500" />
          </header>

          <div
            id="product-list"
            className="mb-6 flex scroll-mt-24 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="relative w-full sm:max-w-xl">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Cari produk, modul, sensor, atau nama item..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white/95 py-3 pl-12 pr-4 text-sm text-gray-900 shadow-sm outline-none transition duration-300 placeholder:text-gray-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
              />
            </div>

            <div className="w-full sm:w-[220px]">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white/95 px-4 py-3 text-sm font-medium text-gray-700 shadow-sm outline-none transition duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
              >
                <option value="default">Urutkan produk</option>
                <option value="price-asc">Harga termurah</option>
                <option value="price-desc">Harga termahal</option>
                <option value="name-asc">Nama A - Z</option>
                <option value="name-desc">Nama Z - A</option>
              </select>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-gray-600">
              Menampilkan{' '}
              <span className="font-bold text-gray-900">
                {filteredAndSortedCards.length}
              </span>{' '}
              produk
            </p>

            {(search || sort !== 'default') && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSort('default');
                }}
                className="hover:bg-primary-50 inline-flex w-fit items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-primary-200 hover:text-primary-700"
              >
                Reset filter
              </button>
            )}
          </div>

          {content}

          <div className="pb-[max(env(safe-area-inset-bottom),_0px)]" />
        </div>
      </Section>

      {selectedCard ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
          onClick={closeProductDetail}
        >
          <div
            className="relative flex h-[760px] max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary-100/40 via-fuchsia-100/20 to-transparent" />

            <button
              type="button"
              onClick={closeProductDetail}
              className="group absolute right-4 top-4 z-30 inline-flex size-11 items-center justify-center overflow-hidden rounded-full border border-white/65 bg-slate-950/35 text-white shadow-[0_18px_38px_rgba(15,23,42,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/45 sm:right-5 sm:top-5"
              aria-label="Tutup popup"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 transition duration-300 group-hover:opacity-100" />
              <svg
                viewBox="0 0 24 24"
                className="relative size-5 transition duration-300 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.3"
                aria-hidden="true"
              >
                <path d="M6.75 6.75 17.25 17.25" />
                <path d="M17.25 6.75 6.75 17.25" />
              </svg>
            </button>

            <div className="relative h-60 w-full shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 sm:h-72">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-slate-950/5 opacity-90" />

              <Image
                loader={passthroughImageLoader}
                unoptimized
                src={selectedCard.image}
                alt={selectedCard.title}
                fill
                sizes="(max-width: 640px) 100vw, 448px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold tracking-tight text-primary-600 sm:text-base">
                  {typeof selectedCard.price === 'number'
                    ? formatIDR(selectedCard.price)
                    : 'Harga belum tersedia'}
                </p>

                {selectedCard.badge ? (
                  <StatusBadge badge={selectedCard.badge} size="md" />
                ) : null}
              </div>

              <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight text-gray-900">
                {selectedCard.title}
              </h3>

              <div className="mt-4 h-px w-full bg-gradient-to-r from-primary-200 via-gray-200 to-transparent" />

              <div className="mt-4 flex-1 overflow-y-auto pr-1">
                <p className="text-sm leading-7 text-gray-600 sm:text-[15px]">
                  {selectedCard.desc}
                </p>
              </div>

              {typeof selectedCard.price === 'number' ? (
                <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Jumlah</p>
                    <div className="mt-1 flex items-center rounded-md border border-gray-200 bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedQuantity((quantity) =>
                            Math.max(quantity - 1, 1),
                          )
                        }
                        disabled={selectedQuantity <= 1}
                        className="inline-flex size-8 items-center justify-center rounded-md text-lg font-bold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-35"
                        aria-label="Kurangi jumlah"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={selectedQuantity}
                        onChange={(e) =>
                          setSelectedQuantity(
                            Math.min(
                              Math.max(Number(e.target.value) || 1, 1),
                              99,
                            ),
                          )
                        }
                        className="w-10 border-0 bg-transparent text-center text-sm font-black text-gray-900 outline-none"
                        aria-label="Jumlah produk"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedQuantity((quantity) =>
                            Math.min(quantity + 1, 99),
                          )
                        }
                        disabled={selectedQuantity >= 99}
                        className="inline-flex size-8 items-center justify-center rounded-md text-lg font-bold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-35"
                        aria-label="Tambah jumlah"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-500">
                      Subtotal
                    </p>
                    <p className="mt-1 text-base font-bold text-gray-900">
                      {formatIDR(selectedCard.price * selectedQuantity)}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-5 grid grid-cols-1 gap-3 pt-4 sm:grid-cols-[0.95fr_1.05fr]">
                <button
                  type="button"
                  onClick={handleShareProduct}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  aria-label={`Bagikan link ${selectedCard.title}`}
                >
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
                    {copiedProductUrl ? (
                      <path d="m5 12 4 4L19 6" />
                    ) : (
                      <>
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <path d="m8.59 13.51 6.83 3.98" />
                        <path d="m15.41 6.51-6.82 3.98" />
                      </>
                    )}
                  </svg>
                  {copiedProductUrl ? 'Link Disalin' : 'Bagikan Produk'}
                </button>

                {typeof selectedCard.price === 'number' ? (
                  <button
                    type="button"
                    onClick={addSelectedProductToCart}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  >
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
                      <circle cx="9" cy="20" r="1" />
                      <circle cx="19" cy="20" r="1" />
                      <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
                      <path d="M14 10v4M12 12h4" />
                    </svg>
                    Tambah ke Daftar
                  </button>
                ) : (
                  <a
                    href={selectedWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  >
                    Tanya Admin
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {cartItems.length > 0 ? (
        <button
          type="button"
          onClick={() => setShowCart(true)}
          className="fixed bottom-4 left-4 z-40 inline-flex h-12 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 text-white shadow-lg transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 sm:bottom-5 sm:left-5"
          aria-label={`Buka daftar belanja, ${cartItemCount} produk`}
        >
          <span className="relative">
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1" />
              <circle cx="19" cy="20" r="1" />
              <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
            </svg>
            <span className="absolute -right-2.5 -top-2.5 inline-flex min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-black leading-5 text-white">
              {cartItemCount}
            </span>
          </span>
          <span className="text-sm font-bold">Daftar Belanja</span>
        </button>
      ) : null}

      {showCart ? (
        <div
          className="fixed inset-0 z-[70] bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setShowCart(false)}
        >
          <div
            className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <header className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
              <div>
                <h2
                  id="cart-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Daftar Belanja
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {cartItemCount} item dari {cartItems.length} produk
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-label="Tutup daftar belanja"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 sm:px-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="inline-flex size-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-7"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="9" cy="20" r="1" />
                      <circle cx="19" cy="20" r="1" />
                      <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-bold text-gray-900">
                    Daftar belanja masih kosong
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowCart(false)}
                    className="mt-4 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Pilih Produk
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {cartItems.map((item) => (
                    <article
                      key={item.product.slug}
                      className="rounded-xl border border-gray-200 bg-white p-3"
                    >
                      <div className="flex gap-3">
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            loader={passthroughImageLoader}
                            unoptimized
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
                                {item.product.title}
                              </h3>
                              <p className="mt-1 text-xs font-semibold text-primary-600">
                                {formatIDR(item.product.price ?? 0)} / item
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeCartItem(item.product.slug)}
                              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-rose-600"
                              aria-label={`Hapus ${item.product.title}`}
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
                                <path d="M4 7h16M9 7V4h6v3M8 7l1 13h6l1-13M10 11v5M14 11v5" />
                              </svg>
                            </button>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.slug,
                                    item.quantity - 1,
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className="inline-flex size-7 items-center justify-center rounded-md font-bold text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                aria-label={`Kurangi ${item.product.title}`}
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-xs font-black text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.slug,
                                    item.quantity + 1,
                                  )
                                }
                                disabled={item.quantity >= 99}
                                className="inline-flex size-7 items-center justify-center rounded-md font-bold text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                aria-label={`Tambah ${item.product.title}`}
                              >
                                +
                              </button>
                            </div>

                            <p className="text-sm font-black text-slate-900">
                              {formatIDR(
                                (item.product.price ?? 0) * item.quantity,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 ? (
              <footer className="border-t border-gray-100 bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total sementara</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {formatIDR(cartTotal)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCartItems([])}
                    className="text-xs font-bold text-rose-600 transition hover:text-rose-700"
                  >
                    Kosongkan daftar
                  </button>
                </div>

                <p className="mt-4 text-xs font-semibold text-gray-700">
                  Konfirmasi stok dan total via WhatsApp
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {waAdmins.map((admin) => (
                    <a
                      key={admin.phone}
                      href={`https://wa.me/${
                        admin.phone
                      }?text=${encodeURIComponent(cartMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#128C4A] p-3 text-sm font-semibold text-white transition hover:bg-[#0f7a40] focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.205-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.478s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.711.226 1.359.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.569-.347Z" />
                        <path d="M12.004 2.003c-5.514 0-9.98 4.466-9.98 9.98 0 1.762.462 3.483 1.34 5L2 22l5.145-1.307a9.93 9.93 0 0 0 4.859 1.254h.004c5.511 0 9.984-4.466 9.984-9.98 0-2.661-1.036-5.163-2.918-7.045a9.9 9.9 0 0 0-7.07-2.919Zm0 18.274h-.003a8.25 8.25 0 0 1-4.204-1.151l-.301-.179-3.054.776.815-2.976-.196-.305a8.26 8.26 0 0 1-1.274-4.409c0-4.556 3.706-8.262 8.263-8.262 2.202 0 4.272.857 5.829 2.414a8.19 8.19 0 0 1 2.419 5.848c-.002 4.557-3.709 8.244-8.294 8.244Z" />
                      </svg>
                      {admin.label}
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowQris(true)}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
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
                    <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3z" />
                    <path d="M15 15h2v2h-2zM19 15h2v6h-6v-2M15 19h2" />
                  </svg>
                  Lihat QRIS
                </button>
                <p className="mt-2 text-[11px] leading-4 text-gray-500">
                  QRIS hanya digunakan setelah admin mengonfirmasi stok dan
                  nominal pembayaran.
                </p>
              </footer>
            ) : null}
          </div>
        </div>
      ) : null}

      {showQris ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4"
          onClick={() => setShowQris(false)}
        >
          <div
            className="flex max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qris-title"
          >
            <header className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
              <div>
                <h2
                  id="qris-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Pembayaran QRIS
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Robotix-ID Electronics
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowQris(false)}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-label="Tutup QRIS"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </header>

            <div className="overflow-y-auto p-4 sm:p-5">
              <div className="mb-4 border-l-4 border-amber-400 bg-amber-50 px-3 py-2.5">
                <p className="text-xs font-semibold text-amber-900">
                  Konfirmasi ke admin sebelum membayar
                </p>
                <p className="mt-1 text-[11px] leading-5 text-amber-700">
                  Pastikan stok tersedia dan nominal pembayaran sudah sesuai
                  dengan total akhir dari admin.
                </p>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <Image
                  src="/assets/images/qris-robotix-id.jpeg"
                  alt="QRIS pembayaran Robotix-ID Electronics"
                  width={1135}
                  height={1600}
                  className="h-auto w-full"
                />
              </div>

              <a
                href="/assets/images/qris-robotix-id.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Buka QRIS Ukuran Penuh
              </a>
              <p className="mt-3 text-center text-[11px] leading-5 text-gray-500">
                Merchant: Robotix-ID - Electronics
                <br />
                NMID: ID1026538466396
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export { ProductList };
