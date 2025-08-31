"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="data-theme"
      defaultTheme="mocha" 
      enableSystem={true}
      disableTransitionOnChange={false}
      themes={["mocha", "macchiato", "frappe", "latte"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
