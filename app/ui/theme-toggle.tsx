"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  // The inline script in app/layout.tsx already set this attribute on the
  // <html> element before hydration, so this always matches the DOM.
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
      className="flex size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
    >
      {theme === "dark" ? (
        <Sun className="size-4" suppressHydrationWarning />
      ) : (
        <Moon className="size-4" suppressHydrationWarning />
      )}
    </button>
  );
}
