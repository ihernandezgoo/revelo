"use client";

import { useState } from "react";
import { Check, Copy, Link2, Sparkles } from "lucide-react";
import { setAlbumRevealMode } from "@/app/actions/albums";

export function CopyLinkButton({
  url,
  albumId,
  initialRevealMode,
}: {
  url: string;
  albumId: number;
  initialRevealMode: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [revealMode, setRevealMode] = useState(initialRevealMode);
  const [savingRevealMode, setSavingRevealMode] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function toggleRevealMode(checked: boolean) {
    setRevealMode(checked);
    setSavingRevealMode(true);
    await setAlbumRevealMode(albumId, checked);
    setSavingRevealMode(false);
  }

  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-card p-5 shadow-xl shadow-black/5">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Link2 className="size-4 text-accent" />
        Compartir álbum
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-card-muted p-1.5 pl-4">
        <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted">
          {url.replace(/^https?:\/\//, "")}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "¡Copiado!" : "Copiar"}
        </button>
      </div>

      <label className="flex cursor-pointer items-center gap-3 border-t border-border pt-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-tint text-accent">
          <Sparkles className="size-4" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-medium">Modo revelar</span>
          <span className="text-xs text-muted">Las fotos se revelan al tocarlas</span>
        </span>
        <input
          type="checkbox"
          role="switch"
          checked={revealMode}
          disabled={savingRevealMode}
          onChange={(event) => toggleRevealMode(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="relative h-6 w-11 shrink-0 rounded-full bg-border transition-colors peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 peer-disabled:opacity-60 after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"
        />
      </label>
    </div>
  );
}
