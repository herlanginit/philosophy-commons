"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "philosophy-commons:saved-resources";
const UPDATE_EVENT = "philosophy-commons:saved-resources-updated";

function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeSaved(slugs: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

export function useSavedResources() {
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSaved(readSaved());
    setHydrated(true);

    const onUpdate = () => setSaved(readSaved());
    window.addEventListener(UPDATE_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener(UPDATE_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const isSaved = useCallback((slug: string) => saved.includes(slug), [saved]);

  const toggle = useCallback((slug: string) => {
    const current = readSaved();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    writeSaved(next);
    setSaved(next);
  }, []);

  return { saved, isSaved, toggle, hydrated };
}
