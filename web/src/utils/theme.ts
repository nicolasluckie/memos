import defaultDarkThemeContent from "../themes/default-dark.css?raw";
import paperThemeContent from "../themes/paper.css?raw";
import whitewallThemeContent from "../themes/whitewall.css?raw";
import shadesOfPurpleThemeContent from "../themes/shades-of-purple.css?raw";
import draculaThemeContent from "../themes/dracula.css?raw";
import falloutThemeContent from "../themes/fallout.css?raw";
import synthwave84ThemeContent from "../themes/synthwave-84.css?raw";
import cyberpunkThemeContent from "../themes/cyberpunk.css?raw";
import cobaltThemeContent from "../themes/cobalt.css?raw";
import materialThemeContent from "../themes/material.css?raw";
import atomThemeContent from "../themes/atom.css?raw";
import ayuDarkThemeContent from "../themes/ayu-dark.css?raw";
import monokaiClassicThemeContent from "../themes/monokai-classic.css?raw";
import corporateThemeContent from "../themes/corporate.css?raw";
import retroThemeContent from "../themes/retro.css?raw";
import springThemeContent from "../themes/spring.css?raw";
import summerThemeContent from "../themes/summer.css?raw";
import autumnThemeContent from "../themes/autumn.css?raw";
import winterThemeContent from "../themes/winter.css?raw";
import valentineThemeContent from "../themes/valentine.css?raw";
import halloweenThemeContent from "../themes/halloween.css?raw";
import nightOwlThemeContent from "../themes/night-owl.css?raw";
import forestThemeContent from "../themes/forest.css?raw";
import aquaThemeContent from "../themes/aqua.css?raw";
import lofiThemeContent from "../themes/lofi.css?raw";
import pastelThemeContent from "../themes/pastel.css?raw";
import luxuryThemeContent from "../themes/luxury.css?raw";
import wireframeThemeContent from "../themes/wireframe.css?raw";
import businessThemeContent from "../themes/business.css?raw";
import lemonadeThemeContent from "../themes/lemonade.css?raw";

const VALID_THEMES = [
  "system",
  "default",
  "default-dark",
  "paper",
  "whitewall",
  "shades-of-purple",
  "dracula",
  "fallout",
  "synthwave-84",
  "cyberpunk",
  "cobalt",
  "material",
  "atom",
  "ayu-dark",
  "monokai-classic",
  "corporate",
  "retro",
  "spring",
  "summer",
  "autumn",
  "winter",
  "valentine",
  "halloween",
  "night-owl",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "luxury",
  "wireframe",
  "business",
  "lemonade",
] as const;
type ValidTheme = (typeof VALID_THEMES)[number];

const THEME_CONTENT: Record<ValidTheme, string | null> = {
  system: null,
  default: null,
  "default-dark": defaultDarkThemeContent,
  paper: paperThemeContent,
  whitewall: whitewallThemeContent,
  "shades-of-purple": shadesOfPurpleThemeContent,
  dracula: draculaThemeContent,
  fallout: falloutThemeContent,
  "synthwave-84": synthwave84ThemeContent,
  cyberpunk: cyberpunkThemeContent,
  cobalt: cobaltThemeContent,
  material: materialThemeContent,
  atom: atomThemeContent,
  "ayu-dark": ayuDarkThemeContent,
  "monokai-classic": monokaiClassicThemeContent,
  corporate: corporateThemeContent,
  retro: retroThemeContent,
  spring: springThemeContent,
  summer: summerThemeContent,
  autumn: autumnThemeContent,
  winter: winterThemeContent,
  valentine: valentineThemeContent,
  halloween: halloweenThemeContent,
  "night-owl": nightOwlThemeContent,
  forest: forestThemeContent,
  aqua: aquaThemeContent,
  lofi: lofiThemeContent,
  pastel: pastelThemeContent,
  luxury: luxuryThemeContent,
  wireframe: wireframeThemeContent,
  business: businessThemeContent,
  lemonade: lemonadeThemeContent,
};

export interface ThemeOption {
  value: string;
  label: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { value: "system", label: "Sync with system" },
  { value: "default", label: "Default Light" },
  { value: "default-dark", label: "Default Dark" },
  { value: "paper", label: "Paper" },
  { value: "whitewall", label: "Whitewall" },
  { value: "shades-of-purple", label: "Shades of Purple" },
  { value: "dracula", label: "Dracula" },
  { value: "fallout", label: "Fallout" },
  { value: "synthwave-84", label: "Synthwave '84" },
  { value: "cyberpunk", label: "Cyberpunk" },
  { value: "cobalt", label: "Cobalt" },
  { value: "material", label: "Material" },
  { value: "atom", label: "Atom" },
  { value: "ayu-dark", label: "Ayu Dark" },
  { value: "monokai-classic", label: "Monokai Classic" },
  { value: "corporate", label: "Corporate" },
  { value: "retro", label: "Retro" },
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
  { value: "valentine", label: "Valentine" },
  { value: "halloween", label: "Halloween" },
  { value: "night-owl", label: "Night Owl" },
  { value: "forest", label: "Forest" },
  { value: "aqua", label: "Aqua" },
  { value: "lofi", label: "Lofi" },
  { value: "pastel", label: "Pastel" },
  { value: "luxury", label: "Luxury" },
  { value: "wireframe", label: "Wireframe" },
  { value: "business", label: "Business" },
  { value: "lemonade", label: "Lemonade" },
];

const validateTheme = (theme: string): ValidTheme => {
  return VALID_THEMES.includes(theme as ValidTheme) ? (theme as ValidTheme) : "default";
};

/**
 * Detects system theme preference
 */
export const getSystemTheme = (): "default" | "default-dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "default-dark" : "default";
  }
  return "default";
};

/**
 * Resolves the actual theme to apply based on user preference
 * If theme is "system", returns the system preference, otherwise returns the theme as-is
 */
export const resolveTheme = (theme: string): ValidTheme => {
  if (theme === "system") {
    return getSystemTheme();
  }
  const validTheme = validateTheme(theme);
  return validTheme === "system" ? getSystemTheme() : validTheme;
};

/**
 * Gets the theme that should be applied on initial load
 * Priority: stored user preference -> system preference -> default
 */
export const getInitialTheme = (): ValidTheme => {
  // Try to get stored theme from localStorage (where user settings might be cached)
  try {
    const storedTheme = localStorage.getItem("memos-theme");
    if (storedTheme && VALID_THEMES.includes(storedTheme as ValidTheme)) {
      return storedTheme as ValidTheme;
    }
  } catch {
    // localStorage might not be available
  }

  // Fall back to system preference (return "system" to enable auto-switching)
  return "system";
};

/**
 * Applies the theme early to prevent flash of wrong theme
 */
export const applyThemeEarly = (): void => {
  const theme = getInitialTheme();
  loadTheme(theme);
};

export const loadTheme = (themeName: string): void => {
  const validTheme = validateTheme(themeName);

  // Resolve "system" to actual theme based on OS preference
  const resolvedTheme = resolveTheme(validTheme);

  // Remove existing theme
  document.getElementById("instance-theme")?.remove();

  // Apply theme (skip for default)
  if (resolvedTheme !== "default") {
    const css = THEME_CONTENT[resolvedTheme];
    if (css) {
      const style = document.createElement("style");
      style.id = "instance-theme";
      style.textContent = css;
      document.head.appendChild(style);
    }
  }

  // Set data attribute with resolved theme
  document.documentElement.setAttribute("data-theme", resolvedTheme);

  // Store theme preference (original, not resolved) for future loads
  try {
    localStorage.setItem("memos-theme", validTheme);
  } catch {
    // localStorage might not be available
  }
};

/**
 * Sets up a listener for system theme preference changes
 * Returns a cleanup function to remove the listener
 */
export const setupSystemThemeListener = (onThemeChange: () => void): (() => void) => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {}; // No-op cleanup
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Handle theme change
  const handleChange = () => {
    onThemeChange();
  };

  // Modern API (addEventListener)
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }

  // Legacy API (addListener) - for older browsers
  if (mediaQuery.addListener) {
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }

  return () => {}; // No-op cleanup
};
