import { useMemo } from "react";
import { workspaceStore } from "@/store";
import { VALID_THEMES, getThemePreviewVars } from "@/utils/theme";

interface ThemeSelectProps {
  value?: string;
  onValueChange?: (theme: string) => void;
  className?: string;
  height?: number | string; // height of the scroll area
}

const ThemeSelect = ({ value, onValueChange, className, height = 360 }: ThemeSelectProps = {}) => {
  const currentTheme = value || workspaceStore.state.theme || "default";

  const items = useMemo(() => VALID_THEMES.map((name) => ({ name, vars: getThemePreviewVars(name) })), []);

  const handlePick = (name: Theme) => {
    if (onValueChange) onValueChange(name);
    else workspaceStore.setTheme(name);
  };

  return (
    <div className={className} style={{ height, overflowY: "auto" }}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-1">
        {items.map(({ name, vars }) => {
          const bg = vars["--background"] || "white";
          const fg = vars["--foreground"] || "black";
          const card = vars["--card"] || bg;
          const cardFg = vars["--card-foreground"] || fg;
          const primary = vars["--primary"] || fg;
          const border = vars["--border"] || "#e5e7eb";
          const isActive = name === currentTheme;
          return (
            <button
              key={name}
              onClick={() => handlePick(name as Theme)}
              className={`rounded-lg border text-left transition-colors ${
                isActive ? "ring-2 ring-primary" : "hover:opacity-90"
              }`}
              style={{ borderColor: border, background: bg, color: fg }}
              aria-pressed={isActive}
            >
              <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium truncate" title={name}>
                    {name}
                  </span>
                  {isActive && <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10" style={{ color: primary }}>Active</span>}
                </div>
                <div className="rounded-md border p-2 text-xs" style={{ background: card, color: cardFg, borderColor: border }}>
                  <div className="font-semibold mb-1" style={{ color: primary }}>
                    Heading
                  </div>
                  <div className="text-[11px] opacity-80">Body text preview • Aa Bb Cc 123</div>
                  <div className="mt-2 flex gap-1">
                    <div className="h-1.5 w-6 rounded" style={{ background: primary }} />
                    <div className="h-1.5 w-6 rounded" style={{ background: vars["--secondary"] || border }} />
                    <div className="h-1.5 w-6 rounded" style={{ background: vars["--muted"] || border }} />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelect;
