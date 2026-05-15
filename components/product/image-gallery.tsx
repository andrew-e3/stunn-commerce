"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; alt: string };

export function ImageGallery({
  images,
  heroOverlay,
}: {
  images: GalleryImage[];
  heroOverlay?: React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const activeImage = images[activeIndex] || images[0]!;

  const selectPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const selectNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      {/* Hero image */}
      <button
        onClick={() => {
          if (didSwipe.current) {
            didSwipe.current = false;
            return;
          }
          open(activeIndex);
        }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
          didSwipe.current = false;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
          const deltaX = endX - touchStartX.current;
          touchStartX.current = null;

          if (Math.abs(deltaX) < 45) return;
          didSwipe.current = true;
          if (deltaX < 0) selectNext();
          else selectPrev();
        }}
        className="relative block aspect-square w-full cursor-zoom-in overflow-hidden bg-[#EDE9F8]"
        aria-label={`View image: ${activeImage.alt}`}
      >
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          priority
        />
        {/* Benefit pills or any overlay content */}
        {heroOverlay && activeIndex === 0 && (
          <div className="pointer-events-none absolute inset-0">
            {heroOverlay}
          </div>
        )}
      </button>

      {/* Mobile thumbnail rail: keeps the buying section close to the first viewport. */}
      <div className="flex gap-2 overflow-x-auto border-b border-black/10 bg-white px-4 py-3 lg:hidden">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActiveIndex(i)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-[8px] bg-[#EDE9F8] transition-all ${
              i === activeIndex
                ? "ring-2 ring-[#111111] ring-offset-2"
                : "opacity-[0.72] ring-1 ring-black/5"
            }`}
            aria-label={`Show image: ${img.alt}`}
            aria-current={i === activeIndex}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Desktop 2-col mosaic */}
      <div className="hidden grid-cols-2 lg:grid">
        {images.slice(1).map((img, i) => (
          <button
            key={img.src}
            onClick={() => open(i + 1)}
            className="relative aspect-square cursor-zoom-in overflow-hidden bg-gray-100"
            aria-label={`View image: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={close}
        >
          {/* Image container */}
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]!.src}
              alt={images[lightboxIndex]!.alt}
              width={1000}
              height={1000}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>

          {/* Close */}
          <button
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Previous image"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Next image"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${i === lightboxIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
