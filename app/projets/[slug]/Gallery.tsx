"use client";

// Galerie de captures : miniatures cliquables + visionneuse plein écran
// navigable au clavier (flèches gauche/droite, Échap pour fermer).
import { useCallback, useEffect, useRef, useState } from "react";
import type { Image as Capture } from "@/data/types";

// Convention de nommage (data/projects.ts) : <nom>.webp pour la version pleine,
// <nom>-thumb.webp pour la miniature affichée dans la grille.
function thumbSrc(src: string) {
  return src.replace(/\.webp$/, "-thumb.webp");
}

export function Gallery({ images, etapeTitre }: { images: Capture[]; etapeTitre: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const showNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (openIndex === null) return;
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, close, showNext, showPrev]);

  if (images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-encre/15 py-10 text-center">
        <p className="font-mono text-xs tracking-widest text-encre/30 uppercase">
          Captures à venir
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Agrandir : ${image.alt}`}
            className="group aspect-video overflow-hidden rounded-xl bg-white ring-1 ring-encre/10 transition-shadow hover:ring-emeraude"
          >
            <img
              src={thumbSrc(image.src)}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visionneuse des captures - ${etapeTitre}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-encre/95 px-6 py-10"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Fermer la visionneuse (Échap)"
            className="absolute right-6 top-6 font-mono text-xs tracking-widest text-ivoire/70 uppercase hover:text-ivoire"
          >
            Échap ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                aria-label="Image précédente"
                className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-3xl text-ivoire/60 hover:text-ivoire sm:left-8"
              >
                ←
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Image suivante"
                className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-3xl text-ivoire/60 hover:text-ivoire sm:right-8"
              >
                →
              </button>
            </>
          )}

          <img
            src={images[openIndex].src}
            alt={images[openIndex].alt}
            className="max-h-[75vh] max-w-full rounded-lg object-contain"
          />
          <p className="mt-6 max-w-xl text-center font-mono text-xs tracking-wide text-ivoire/70">
            {images[openIndex].legende}
          </p>
        </div>
      )}
    </>
  );
}
