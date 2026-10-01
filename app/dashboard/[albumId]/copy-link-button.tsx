"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
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
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <button
        type="button"
        onClick={copy}
        className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-card"
      >
        {copied ? <Check className="size-4 text-accent" /> : <Link2 className="size-4" />}
        {copied ? "¡Copiado!" : "Copiar enlace"}
      </button>
      <label className="flex items-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={revealMode}
          disabled={savingRevealMode}
          onChange={(event) => toggleRevealMode(event.target.checked)}
          className="size-3.5 accent-accent"
        />
        Revelar fotos al hacer clic
      </label>
    </div>
  );
}
