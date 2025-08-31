"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Coffee, Cloud } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: "mocha", icon: <Moon className="h-4 w-4" />, label: "Mocha" },
    { name: "macchiato", icon: <Cloud className="h-4 w-4" />, label: "Macchiato" },
    { name: "frappe", icon: <Coffee className="h-4 w-4" />, label: "Frappe" },
    { name: "latte", icon: <Sun className="h-4 w-4" />, label: "Latte" },
  ];

  // Find the current theme to display the correct icon
  const currentTheme = themes.find((t) => t.name === theme) || themes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
          {currentTheme.icon}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={theme === t.name ? "bg-accent text-accent-foreground" : ""}
          >
            <span className="mr-2">{t.icon}</span>
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
