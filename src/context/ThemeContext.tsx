"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemePreset, ThemeColors, ThemeStyles, THEME_PRESETS, STARX_DEFAULT_THEME } from "@/data/themePresets";

interface ThemeContextType {
  activePresetId: string;
  activeThemeId: string; // alias
  colors: ThemeColors;
  themeColors: ThemeColors; // alias
  styles: ThemeStyles;
  themeStyles: ThemeStyles; // alias
  isDraft: boolean;
  setPreset: (presetId: string) => void;
  updateColor: (key: keyof ThemeColors, value: string) => void;
  updateStyles: (styles: Partial<ThemeStyles>) => void;
  publishTheme: () => void;
  resetToDefault: () => void;
  discardDraft: () => void;
  allPresets: ThemePreset[];
}

const STORAGE_KEY_PUBLISHED = "starx_theme_published";
const STORAGE_KEY_DRAFT = "starx_theme_draft";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activePresetId, setActivePresetId] = useState<string>("starx-futuristic-blue");
  const [colors, setColors] = useState<ThemeColors>(STARX_DEFAULT_THEME);
  const [styles, setStyles] = useState<ThemeStyles>({
    cardRadius: "xl",
    glowIntensity: "medium",
    borderStyle: "glow",
    fontFamily: "Inter",
  });
  const [isDraft, setIsDraft] = useState(false);

  // Apply CSS variables to :root
  const applyVariables = (themeColors: ThemeColors) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--color-primary-bg", themeColors.primaryBackground);
    root.style.setProperty("--color-secondary-bg", themeColors.secondaryBackground);
    root.style.setProperty("--color-card-bg", themeColors.cardBackground);
    root.style.setProperty("--color-primary-blue", themeColors.primaryBlue);
    root.style.setProperty("--color-royal-blue", themeColors.royalBlue);
    root.style.setProperty("--color-neon-cyan", themeColors.neonCyan);
    root.style.setProperty("--color-electric-purple", themeColors.electricPurple);
    root.style.setProperty("--color-neon-magenta", themeColors.neonMagenta);
    root.style.setProperty("--color-premium-pink", themeColors.premiumPink);
    root.style.setProperty("--color-electric-orange", themeColors.electricOrange);
    root.style.setProperty("--color-emerald-accent", themeColors.emeraldAccent);
    root.style.setProperty("--color-white-text", themeColors.whiteText);
    root.style.setProperty("--color-secondary-text", themeColors.secondaryText);
    root.style.setProperty("--color-border", themeColors.borderColor);
    root.style.setProperty("--color-glow", themeColors.glowColor);
  };

  // Load published theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PUBLISHED);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.colors) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setColors(parsed.colors);
          applyVariables(parsed.colors);
        }
        if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
        if (parsed.styles) setStyles(parsed.styles);
      } else {
        applyVariables(STARX_DEFAULT_THEME);
      }
    } catch {
      applyVariables(STARX_DEFAULT_THEME);
    }
  }, []);

  const setPreset = (presetId: string) => {
    const found = THEME_PRESETS.find((p) => p.id === presetId);
    if (!found) return;
    setActivePresetId(presetId);
    setColors(found.colors);
    setStyles(found.styles);
    setIsDraft(true);
    applyVariables(found.colors);
  };

  const updateColor = (key: keyof ThemeColors, value: string) => {
    const updated = { ...colors, [key]: value };
    setColors(updated);
    setActivePresetId("custom");
    setIsDraft(true);
    applyVariables(updated);
  };

  const updateStyles = (partial: Partial<ThemeStyles>) => {
    setStyles((prev) => ({ ...prev, ...partial }));
    setIsDraft(true);
  };

  const publishTheme = () => {
    const payload = { activePresetId, colors, styles, publishedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(payload));
    setIsDraft(false);
  };

  const discardDraft = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PUBLISHED);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.colors) {
          setColors(parsed.colors);
          applyVariables(parsed.colors);
        }
        if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
        if (parsed.styles) setStyles(parsed.styles);
      } else {
        resetToDefault();
      }
    } catch {
      resetToDefault();
    }
    setIsDraft(false);
  };

  const resetToDefault = () => {
    setActivePresetId("starx-futuristic-blue");
    setColors(STARX_DEFAULT_THEME);
    setStyles({
      cardRadius: "xl",
      glowIntensity: "medium",
      borderStyle: "glow",
      fontFamily: "Inter",
    });
    setIsDraft(false);
    applyVariables(STARX_DEFAULT_THEME);
    localStorage.removeItem(STORAGE_KEY_PUBLISHED);
    localStorage.removeItem(STORAGE_KEY_DRAFT);
  };

  return (
    <ThemeContext.Provider
      value={{
        activePresetId,
        activeThemeId: activePresetId,
        colors,
        themeColors: colors,
        styles,
        themeStyles: styles,
        isDraft,
        setPreset,
        updateColor,
        updateStyles,
        publishTheme,
        resetToDefault,
        discardDraft,
        allPresets: THEME_PRESETS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
