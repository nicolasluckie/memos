import { Monitor, Moon, Palette, Sun, Wallpaper, Code, Droplet, Ghost, Heart, Leaf, Sparkles, Coffee } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { instanceStore } from "@/store";
import { THEME_OPTIONS } from "@/utils/theme";

interface ThemeSelectProps {
  value?: string;
  onValueChange?: (theme: string) => void;
  className?: string;
}

const THEME_ICONS: Record<string, JSX.Element> = {
  system: <Monitor className="w-4 h-4" />,
  default: <Sun className="w-4 h-4" />,
  "default-dark": <Moon className="w-4 h-4" />,
  paper: <Palette className="w-4 h-4" />,
  whitewall: <Wallpaper className="w-4 h-4" />,
  "shades-of-purple": <Sparkles className="w-4 h-4" />,
  dracula: <Moon className="w-4 h-4" />,
  fallout: <Droplet className="w-4 h-4" />,
  "synthwave-84": <Code className="w-4 h-4" />,
  cyberpunk: <Code className="w-4 h-4" />,
  cobalt: <Code className="w-4 h-4" />,
  material: <Code className="w-4 h-4" />,
  atom: <Code className="w-4 h-4" />,
  "ayu-dark": <Moon className="w-4 h-4" />,
  "monokai-classic": <Code className="w-4 h-4" />,
  corporate: <Palette className="w-4 h-4" />,
  retro: <Palette className="w-4 h-4" />,
  spring: <Leaf className="w-4 h-4" />,
  summer: <Sun className="w-4 h-4" />,
  autumn: <Leaf className="w-4 h-4" />,
  winter: <Droplet className="w-4 h-4" />,
  valentine: <Heart className="w-4 h-4" />,
  halloween: <Ghost className="w-4 h-4" />,
  "night-owl": <Moon className="w-4 h-4" />,
  forest: <Leaf className="w-4 h-4" />,
  aqua: <Droplet className="w-4 h-4" />,
  lofi: <Coffee className="w-4 h-4" />,
  pastel: <Palette className="w-4 h-4" />,
  luxury: <Sparkles className="w-4 h-4" />,
  wireframe: <Code className="w-4 h-4" />,
  business: <Palette className="w-4 h-4" />,
  lemonade: <Sun className="w-4 h-4" />,
};

const ThemeSelect = ({ value, onValueChange, className }: ThemeSelectProps = {}) => {
  const currentTheme = value || instanceStore.state.theme || "system";

  const handleThemeChange = (newTheme: Theme) => {
    if (onValueChange) {
      onValueChange(newTheme);
    } else {
      instanceStore.setTheme(newTheme);
    }
  };

  return (
    <Select value={currentTheme} onValueChange={handleThemeChange}>
      <SelectTrigger className={className}>
        <div className="flex items-center gap-2">
          <SelectValue placeholder="Select theme" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {THEME_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {THEME_ICONS[option.value] || <Palette className="w-4 h-4" />}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ThemeSelect;
