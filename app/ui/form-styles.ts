// Clases compartidas por los formularios de la app (auth y dashboard), en la
// misma línea visual que las páginas de marketing.

export const fieldClass =
  "w-full rounded-2xl border border-transparent bg-card-muted py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:bg-card";

export const plainFieldClass =
  "w-full rounded-2xl border border-transparent bg-card-muted px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:bg-card";

export const fieldIconClass =
  "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30 disabled:pointer-events-none disabled:opacity-60";

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground/40";

export const errorClass =
  "rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300";
