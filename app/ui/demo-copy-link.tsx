"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink, Link2 } from "lucide-react";

const DEMO_ALBUM_URL =
  "https://reveloweb.vercel.app/b3e5d2d4-9d38-47d3-b683-985102c0f723";

export function DemoCopyLink() {
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(copiedTimer.current);
      clearTimeout(toastTimer.current);
    };
  }, []);

  async function copy() {
    await navigator.clipboard.writeText(DEMO_ALBUM_URL);
    setCopied(true);
    setToastVisible(true);
    clearTimeout(copiedTimer.current);
    clearTimeout(toastTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    toastTimer.current = setTimeout(() => setToastVisible(false), 5000);
  }

  return (
    <>
      <div className="flex items-center gap-3 rounded-2xl bg-card p-2 pl-4 text-foreground shadow-2xl">
        <Link2 className="size-4 shrink-0 text-accent" />
        <span className="truncate font-mono text-xs sm:text-sm">
          revelo.app/8f3c2a91
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "¡Copiado!" : "Copiar"}
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-sm items-start gap-3 rounded-2xl bg-card p-4 text-foreground shadow-2xl shadow-black/20 transition-all duration-300 ${
          toastVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-tint text-accent">
          <Check className="size-4" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-sm font-medium">¡Enlace copiado!</p>
          <p className="text-xs text-muted">
            Pégalo en una nueva pestaña y descubre cómo se ve un álbum
            compartido en Revelo.
          </p>
          <a
            href={DEMO_ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-1 text-xs font-medium text-accent hover:underline"
          >
            O ábrelo directamente
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </>
  );
}
