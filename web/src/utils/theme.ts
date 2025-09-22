import aquaThemeContent from "../themes/aqua.css?raw";
import atomThemeContent from "../themes/atom.css?raw";
import autumnThemeContent from "../themes/autumn.css?raw";
import ayuDarkThemeContent from "../themes/ayu-dark.css?raw";
import businessThemeContent from "../themes/business.css?raw";
import cobaltThemeContent from "../themes/cobalt.css?raw";
import corporateThemeContent from "../themes/corporate.css?raw";
import cyberpunkThemeContent from "../themes/cyberpunk.css?raw";
import defaultDarkThemeContent from "../themes/default-dark.css?raw";
import draculaThemeContent from "../themes/dracula.css?raw";
import falloutThemeContent from "../themes/fallout.css?raw";
import forestThemeContent from "../themes/forest.css?raw";
import halloweenThemeContent from "../themes/halloween.css?raw";
import lemonadeThemeContent from "../themes/lemonade.css?raw";
import lofiThemeContent from "../themes/lofi.css?raw";
import luxuryThemeContent from "../themes/luxury.css?raw";
import materialThemeContent from "../themes/material.css?raw";
import monokaiClassicThemeContent from "../themes/monokai-classic.css?raw";
import nightOwlThemeContent from "../themes/night-owl.css?raw";
import paperThemeContent from "../themes/paper.css?raw";
import pastelThemeContent from "../themes/pastel.css?raw";
import retroThemeContent from "../themes/retro.css?raw";
import shadesOfPurpleThemeContent from "../themes/shades-of-purple.css?raw";
import springThemeContent from "../themes/spring.css?raw";
import summerThemeContent from "../themes/summer.css?raw";
import synthwave84ThemeContent from "../themes/synthwave-84.css?raw";
import valentineThemeContent from "../themes/valentine.css?raw";
import whitewallThemeContent from "../themes/whitewall.css?raw";
import winterThemeContent from "../themes/winter.css?raw";
import wireframeThemeContent from "../themes/wireframe.css?raw";
import defaultThemeRaw from "../themes/default.css?raw";

const THEMES = [
  { name: "default", content: null },
  { name: "default-dark", content: defaultDarkThemeContent },
  { name: "paper", content: paperThemeContent },
  { name: "whitewall", content: whitewallThemeContent },
  { name: "shades-of-purple", content: shadesOfPurpleThemeContent },
  { name: "dracula", content: draculaThemeContent },
  { name: "fallout", content: falloutThemeContent },
  { name: "synthwave-84", content: synthwave84ThemeContent },
  { name: "cyberpunk", content: cyberpunkThemeContent },
  { name: "cobalt", content: cobaltThemeContent },
  { name: "material", content: materialThemeContent },
  { name: "atom", content: atomThemeContent },
  { name: "ayu-dark", content: ayuDarkThemeContent },
  { name: "monokai-classic", content: monokaiClassicThemeContent },
  { name: "corporate", content: corporateThemeContent },
  { name: "retro", content: retroThemeContent },
  { name: "spring", content: springThemeContent },
  { name: "summer", content: summerThemeContent },
  { name: "autumn", content: autumnThemeContent },
  { name: "winter", content: winterThemeContent },
  { name: "valentine", content: valentineThemeContent },
  { name: "halloween", content: halloweenThemeContent },
  { name: "night-owl", content: nightOwlThemeContent },
  { name: "forest", content: forestThemeContent },
  { name: "aqua", content: aquaThemeContent },
  { name: "lofi", content: lofiThemeContent },
  { name: "pastel", content: pastelThemeContent },
  { name: "luxury", content: luxuryThemeContent },
  { name: "wireframe", content: wireframeThemeContent },
  { name: "business", content: businessThemeContent },
  { name: "lemonade", content: lemonadeThemeContent },
] as const;

type ValidTheme = (typeof THEMES)[number]["name"];

export const VALID_THEMES = THEMES.map((theme) => theme.name) as ValidTheme[];

const THEME_CONTENT: Record<ValidTheme, string | null> = THEMES.reduce(
  (acc, theme) => {
    acc[theme.name] = theme.content;
    return acc;
  },
  {} as Record<ValidTheme, string | null>,
);

const validateTheme = (theme: string): ValidTheme => {
  return VALID_THEMES.includes(theme as ValidTheme) ? (theme as ValidTheme) : "default";
};

// Return the raw CSS string for a given theme name.
export const getThemeCss = (themeName: string): string | null => {
  const name = validateTheme(themeName);
  if (name === "default") return defaultThemeRaw;
  return THEME_CONTENT[name] ?? null;
};

// Extract CSS custom properties from a :root block for preview purposes.
const extractVarsFromCss = (css: string): Record<string, string> => {
  try {
    const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
    if (!rootMatch) return {};
    const body = rootMatch[1];
    const vars: Record<string, string> = {};
    const varRegex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
    let match: RegExpExecArray | null;
    while ((match = varRegex.exec(body))) {
      vars[`--${match[1]}`] = match[2].trim();
    }
    return vars;
  } catch {
    return {};
  }
};

// Expose a subset of variables commonly used for previews without switching the app theme.
export const getThemePreviewVars = (themeName: string): Record<string, string> => {
  const css = getThemeCss(themeName) || "";
  if (!css) return {};
  const vars = extractVarsFromCss(css);
  const keys = [
    "--background",
    "--foreground",
    "--card",
    "--card-foreground",
    "--primary",
    "--primary-foreground",
    "--secondary",
    "--secondary-foreground",
    "--muted",
    "--muted-foreground",
    "--border",
  ];
  const out: Record<string, string> = {};
  for (const k of keys) {
    if (vars[k]) {
      out[k] = vars[k]!;
    }
  }
  return out;
};

export const loadTheme = (themeName: string): void => {
  const validTheme = validateTheme(themeName);

  // Remove existing theme
  document.getElementById("workspace-theme")?.remove();

  // Apply theme (skip for default)
  if (validTheme !== "default") {
    const css = THEME_CONTENT[validTheme];
    if (css) {
      const style = document.createElement("style");
      style.id = "workspace-theme";
      style.textContent = css;
      document.head.appendChild(style);
    }
  }

  // Set data attribute
  document.documentElement.setAttribute("data-theme", validTheme);
};
