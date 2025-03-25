// src/providers/theme-provider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</> // Implementação mínima que não faz nada ainda
  );
}
